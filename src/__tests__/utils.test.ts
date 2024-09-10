import {
  Any,
  Color,
  Dictionary,
  isBoolean,
  isDate,
  isEmail,
  isNumber,
  isString,
  List,
  Nullable,
  objectHasKey,
} from "@mantlebee/ts-core";

import {
  BooleanColumn,
  ColorColumn,
  CustomColumn,
  DateColumn,
  EmailColumn,
  EnumColumn,
  FirstNameColumn,
  IdColumn,
  LastNameColumn,
  LoremIpsumColumn,
  NumberColumn,
  PatternColumn,
  StringColumn,
} from "@/columns";
import {
  CountRelationColumn,
  CustomRelationColumn,
  LookupRelationColumn,
} from "@/relations";
import {
  createTableKey,
  getDatabaseDataset,
  getDatasetRows,
  getTableRows,
} from "@/utils";

import { Table } from "../models";
import { ITable } from "@/interfaces";
import { Row } from "@/types";

const ordersKey = createTableKey<Order>("orders");
const orderProductsKey = createTableKey<OrderProduct>("order-products");
const productsKey = createTableKey<Product>("products");
const productCategoriesKey =
  createTableKey<ProductCategory>("product-categories");

//#region Products
type Product = Row & { categoryId: number; id: number; name: string };
const productsTable = new Table<Product>(productsKey, [
  new IdColumn("id"),
  new StringColumn("name", () => ({ maxLength: 20 })),
  new LookupRelationColumn("categoryId", 0, productCategoriesKey, "id"),
]);
//#endregion

//#region Product Categories
type ProductCategory = Row & { id: number; name: string };
const productCategoriesTable = new Table<ProductCategory>(
  productCategoriesKey,
  [new IdColumn("id"), new StringColumn("name", () => ({ maxLength: 20 }))]
);
//#endregion

//#region Orders
type Order = Row & {
  categoriesCount: number;
  id: number;
  productsCount: number;
};
const ordersTable = new Table<Order>(ordersKey, [
  new IdColumn("id"),
  new CustomRelationColumn(
    "categoriesCount",
    0,
    orderProductsKey,
    (order, orderProducts, dataset) => {
      // Product ids of the order
      const productsIds = orderProducts
        .filter((a) => a.orderId === order.id)
        .map((a) => a.productId);
      // Products of the order
      const products = dataset[productsKey];
      // Categories ids list (without duplicate values)
      const categoriesIds = new Set(
        products
          .filter((a) => productsIds.includes(a.id))
          .map((a) => a.categoryId)
      );
      // Count of the categories of the order
      return categoriesIds.size;
    }
  ),
  new CountRelationColumn(
    "productsCount",
    orderProductsKey,
    (o, p) => o.id === p.orderId
  ),
]);
//#endregion

//#region Order Products
type OrderProduct = Row & { orderId: number; productId: number };
const orderProductsTable = new Table<OrderProduct>(orderProductsKey, [
  new LookupRelationColumn("orderId", 0, ordersKey, "id"),
  new LookupRelationColumn("productId", 0, productsKey, "id"),
]);
//#endregion

const tables: List<ITable<Any>> = [
  productCategoriesTable,
  productsTable,
  orderProductsTable,
  ordersTable,
];

describe("Table", () => {
  describe("utils", () => {
    describe("getDatabaseDataset", () => {
      it("Generates a map where the keys are the tables names and the values the generated rows.", () => {
        const rowsNumberMap: Dictionary<number> = {
          [productCategoriesKey]: 10,
          [productsKey]: 50,
          [orderProductsKey]: 5,
          [ordersKey]: 1,
        };
        const dataset = getDatabaseDataset(tables, rowsNumberMap);
        expect(Object.keys(dataset)).toHaveLength(4);
        const productCategories = getDatasetRows(dataset, productCategoriesKey);
        const products = getDatasetRows(dataset, productsKey);
        const orderProducts = getDatasetRows(dataset, orderProductsKey);
        const orders = getDatasetRows(dataset, ordersKey);
        const categoriesIds = productCategories.map((a) => a.id);
        products.forEach((a) => {
          expect(categoriesIds).toContain(a.categoryId);
        });
        const ordersIds = orders.map((a) => a.id);
        orderProducts.forEach((a) => {
          expect(ordersIds).toContain(a.orderId);
        });
        orders.forEach((a) => {
          expect(a.productsCount).toBe(
            orderProducts.filter((b) => b.orderId === a.id).length
          );
        });
      });
    });
    describe("getTableRows", () => {
      it("Generates 5 rows of {name: string}", () => {
        type Row = { name: string };
        const rows = getTableRows<Row>(
          [
            new StringColumn<Row>("name", () => ({
              maxLength: 12,
              minLength: 4,
            })),
          ],
          5
        );
        expect(rows.length).toBe(5);
        expect(rows.every((a) => objectHasKey(a, "name"))).toBeTruthy();
        expect(
          rows.every((a) => a.name.length >= 4 && a.name.length <= 12)
        ).toBeTruthy();
      });
      it("Generates 100 rows of `{id: number, name: string, surname: string, fullname: string, age: Nullable<number>, email: string active: boolean, registered: Date, expires: Date, type: RowType, color: string, scoreMax: number; score: number, phone: string, username: string}`", () => {
        enum RowType {
          base,
          standard,
          advanced,
        }
        type Row = {
          id: number;
          name: string;
          surname: string;
          fullname: string;
          age: Nullable<number>;
          email: string;
          active: boolean;
          registered: Date;
          expires: Date;
          type: RowType;
          color: Color;
          scoreMax: number;
          score: number;
          phone: string;
          username: string;
          description: string;
        };
        const rows = getTableRows<Row>(
          [
            new IdColumn<Row>("id"),
            new FirstNameColumn<Row>("name"),
            new LastNameColumn<Row>("surname"),
            new CustomColumn<Row, string>(
              "fullname",
              (a) => `${a.name} ${a.surname}`
            ),
            new NumberColumn<Row>("age", () => ({ max: 90, nullable: true })),
            new EmailColumn<Row>("email", (a) => ({
              firstNames: [a.name],
              lastNames: [a.surname],
            })),
            new BooleanColumn<Row>("active"),
            new DateColumn<Row>("registered"),
            new DateColumn<Row>("expires", (a) => ({ from: a.registered })),
            new EnumColumn<Row, RowType>("type", Object(RowType)),
            new ColorColumn<Row>("color"),
            new NumberColumn<Row>("scoreMax", () => ({ max: 100 })),
            new NumberColumn<Row>("score", (a) => ({ max: a.scoreMax })),
            new PatternColumn<Row>("phone", "+000-00000"),
            new PatternColumn<Row>("username", "a{8,12}"),
            new LoremIpsumColumn("description", () => ({
              nullable: true,
              paragraphs: { max: 5, min: 5 },
            })),
          ],
          100
        );
        expect(rows.length).toBe(100);
        let lastRow: Nullable<Row> = null;
        rows.forEach((a) => {
          if (lastRow) expect(a.id).toBe(lastRow.id + 1);
          expect(isNumber(a.id)).toBeTruthy();
          expect(isString(a.name)).toBeTruthy();
          expect(isString(a.surname)).toBeTruthy();
          expect(isString(a.fullname)).toBeTruthy();
          expect(a.fullname).toBe(`${a.name} ${a.surname}`);
          expect(isEmail(a.email)).toBeTruthy();
          expect(
            a.email.indexOf(
              `${a.name.toLowerCase()}.${a.surname.toLowerCase()}`
            )
          ).toBe(0);
          expect(isBoolean(a.active)).toBeTruthy();
          expect(isDate(a.registered)).toBeTruthy();
          expect(isDate(a.expires)).toBeTruthy();
          expect(a.expires.getTime()).toBeGreaterThanOrEqual(
            a.registered.getTime()
          );
          expect(a.type in RowType).toBeTruthy();
          expect(a.color.rgba()).toMatch(
            /^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0-9]\)$$/
          );
          expect(isNumber(a.scoreMax)).toBeTruthy();
          expect(isNumber(a.score)).toBeTruthy();
          expect(a.score).toBeLessThanOrEqual(a.scoreMax);
          expect(isString(a.phone)).toBeTruthy();
          expect(a.phone).toMatch(/^\+[0-9]{3}-[0-9]{5}$/);
          expect(isString(a.username)).toBeTruthy();
          expect(a.username).toMatch(/^[a-z]{8,12}$/);
          expect(Object.keys(a)).toEqual([
            "id",
            "name",
            "surname",
            "fullname",
            "age",
            "email",
            "active",
            "registered",
            "expires",
            "type",
            "color",
            "scoreMax",
            "score",
            "phone",
            "username",
            "description",
          ]);
          lastRow = a;
        });
        // Nullable columns
        expect(rows.some((a) => isNumber(a.age))).toBeTruthy();
        expect(rows.some((a) => a.age === null)).toBeTruthy();
        expect(rows.some((a) => isString(a.description))).toBeTruthy();
        expect(rows.some((a) => a.description === null)).toBeTruthy();
        rows
          .filter((a) => a.description)
          .forEach((a) => {
            expect(a.description.split("\n\n")).toHaveLength(5);
          });
      });
    });
  });
});
