import {
  Color,
  Dictionary,
  isBoolean,
  isDate,
  isEmail,
  isNumber,
  isString,
  Nullable,
  objectHasKey,
} from "@mantlebee/ts-core";

import {
  ColumnBoolean,
  ColumnColor,
  ColumnCustom,
  ColumnDate,
  ColumnEmail,
  ColumnEnum,
  ColumnFirstName,
  ColumnId,
  ColumnLastName,
  ColumnLoremIpsum,
  ColumnNumber,
  ColumnNumberDefault,
  ColumnPattern,
  ColumnString,
} from "@/columns";
import { RelationCount, RelationCustom, RelationLookup } from "@/relations";
import { getDatabaseDataset, getTableRows } from "@/utils";

import { Table } from "../models";

//#region Products
type Product = { categoryId: number; id: number; name: string };
const productsTable = new Table<Product>("products", [
  new ColumnId("id"),
  new ColumnString("name", () => ({ maxLength: 20 })),
  new ColumnNumberDefault("categoryId"),
]);
//#endregion

//#region Product Categories
type ProductCategory = { id: number; name: string };
const productCategoriesTable = new Table<ProductCategory>(
  "product-categories",
  [new ColumnId("id"), new ColumnString("name", () => ({ maxLength: 20 }))]
);
//#endregion

//#region Orders
type Order = { categoriesCount: number; id: number; productsCount: number };
const ordersTable = new Table<Order>("orders", [
  new ColumnId("id"),
  new ColumnNumberDefault("categoriesCount"),
  new ColumnNumberDefault("productsCount"),
]);
//#endregion

//#region Order Products
type OrderProduct = { orderId: number; productId: number };
const orderProductsTable = new Table<OrderProduct>("order-products", [
  new ColumnNumberDefault("orderId"),
  new ColumnNumberDefault("productId"),
]);
//#endregion

const productCategoryRelation = new RelationLookup(
  "categoryId",
  productsTable.key,
  productCategoriesTable.key,
  "id"
);
const orderProductOrderRelation = new RelationLookup(
  "orderId",
  orderProductsTable.key,
  ordersTable.key,
  "id"
);
const orderProductProductRelation = new RelationLookup(
  "productId",
  orderProductsTable.key,
  productsTable.key,
  "id"
);
const orderProductsCountRelation = new RelationCount(
  "productsCount",
  ordersTable.key,
  orderProductsTable.key,
  (o, op) => op.orderId === o.id
);
const orderCategoriesCountRelations = new RelationCustom(
  "categoriesCount",
  ordersTable.key,
  orderProductsTable.key,
  (order, orderProducts, dataset) => {
    // Product ids of the order
    const productsIds = orderProducts
      .filter((a) => a.orderId === order.id)
      .map((a) => a.productId);
    // Products of the order
    const products = dataset[productsTable.name].rows;
    // Categories ids list with duplicate values
    const fullCategoriesIds = products
      .filter((a) => productsIds.includes(a.id))
      .map((a) => a.categoryId);
    // Distinct of categories ids
    const categoriesIds = new Set(fullCategoriesIds).values;
    // Count of the categories of the order
    return categoriesIds.length;
  }
);

const tables = [
  productCategoriesTable,
  productsTable,
  orderProductsTable,
  ordersTable,
];
const relations = [
  productCategoryRelation,
  orderProductOrderRelation,
  orderProductProductRelation,
  orderProductsCountRelation,
  orderCategoriesCountRelations,
];

describe("Table", () => {
  describe("utils", () => {
    describe("getDatabaseDataset", () => {
      it("Generates a map where the keys are the tables names and the values the generated rows.", () => {
        const rowsNumberMap: Dictionary<number> = {
          [productCategoriesTable.name]: 10,
          [productsTable.name]: 50,
          [orderProductsTable.name]: 5,
          [ordersTable.name]: 1,
        };
        const dataset = getDatabaseDataset(tables, rowsNumberMap, relations);
        const datasetValues = Object.values(dataset);
        expect(datasetValues.length).toBe(4);
        datasetValues.forEach((datasetItem, index) => {
          expect(datasetItem.table).toBe(tables[index]);
          expect(datasetItem.rows.length).toBe(
            rowsNumberMap[datasetItem.table.name]
          );
        });
        const productCategories = dataset[productCategoriesTable.name].rows;
        const products = dataset[productsTable.name].rows;
        const orderProducts = dataset[orderProductsTable.name].rows;
        const orders = dataset[ordersTable.name].rows;
        const categoriesIds = productCategories.map((a) => a.id);
        products.forEach((a) => {
          expect(categoriesIds).toContain(a.categoryId);
        });
        const ordersIds = orders.map((a) => a.id);
        orderProducts.forEach((a) => {
          expect(ordersIds).toContain(a.orderId);
        });
        orders.forEach((a) => {
          expect(a.productsCount).toBeLessThanOrEqual(orderProducts.length);
        });
      });
    });
    describe("getTableRows", () => {
      it("Generates 5 rows of {name: string}", () => {
        type Row = { name: string };
        const rows = getTableRows<Row>(
          [
            new ColumnString<Row>("name", () => ({
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
            new ColumnId<Row>("id"),
            new ColumnFirstName<Row>("name"),
            new ColumnLastName<Row>("surname"),
            new ColumnCustom<Row, string>(
              "fullname",
              (a) => `${a.name} ${a.surname}`
            ),
            new ColumnNumber<Row>("age", () => ({ max: 90, nullable: true })),
            new ColumnEmail<Row>("email", (a) => ({
              firstNames: [a.name],
              lastNames: [a.surname],
            })),
            new ColumnBoolean<Row>("active"),
            new ColumnDate<Row>("registered"),
            new ColumnDate<Row>("expires", (a) => ({ dateFrom: a.registered })),
            new ColumnEnum<Row, RowType>("type", Object(RowType)),
            new ColumnColor<Row>("color"),
            new ColumnNumber<Row>("scoreMax", () => ({ max: 100 })),
            new ColumnNumber<Row>("score", (a) => ({ max: a.scoreMax })),
            new ColumnPattern<Row>("phone", "+000-00000"),
            new ColumnPattern<Row>("username", "a{8,12}"),
            new ColumnLoremIpsum("description", () => ({
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
