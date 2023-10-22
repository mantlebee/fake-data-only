import {
  Any,
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
  ColumnBoolean,
  ColumnColor,
  ColumnCustom,
  ColumnDate,
  ColumnDateDependency,
  ColumnEmailDependency,
  ColumnEnum,
  ColumnFirstName,
  ColumnId,
  ColumnLastName,
  ColumnNumber,
  ColumnNumberDependency,
  ColumnPattern,
  ColumnString,
} from "@/columns";
import {
  ColumnRelationCount,
  ColumnRelationCustom,
  ColumnRelationLookup,
} from "@/relations";
import { TableGetRowsDelegate } from "@/utils";
import { Row } from "@/types";

import { Table } from "../models";
import { DatabaseGetDataDelegate } from "../utils";
import { ITable, Relation } from "..";

//#region Types
type Product = { categoryId: number; id: number; name: string };
type ProductCategory = { id: number; name: string };
type Order = {
  categoriesCount: number;
  id: number;
  productsCount: number;
};
type OrderProduct = { orderId: number; productId: number };
//#endregion

//#region Columns
const productCategoryColumn = new ColumnRelationLookup<
  Product,
  ProductCategory,
  number
>("categoryId", 0, "id");
const orderCategoriesCountColumn = new ColumnRelationCustom<
  Order,
  OrderProduct,
  number
>("categoriesCount", 0, (order, orderProducts, data) => {
  // Product ids of the order
  const productsIds = orderProducts
    .filter((a) => a.orderId === order.id)
    .map((a) => a.productId);
  // Products of the order
  const products = data[productsTable.name].rows;
  // Categories ids list with duplicate values
  const fullCategoriesIds = products
    .filter((a) => productsIds.includes(a.id))
    .map((a) => a.categoryId);
  // Distinct of categories ids
  const categoriesIds = new Set(fullCategoriesIds).values;
  // Count of the categories of the order
  return categoriesIds.length;
});
const orderProductsCountColumn = new ColumnRelationCount<Order, OrderProduct>(
  "productsCount",
  (o, op) => op.orderId === o.id,
);
const orderProductOrderColumn = new ColumnRelationLookup<
  OrderProduct,
  Order,
  number
>("orderId", 0, "id");
const orderProductProductColumn = new ColumnRelationLookup<
  OrderProduct,
  Product,
  number
>("productId", 0, "id");
//#endregion

//#region Tables
const productsTable = new Table<Product>("products", [
  new ColumnId("id"),
  new ColumnString("name", { maxLength: 20 }),
  productCategoryColumn,
]);
const productCategoriesTable = new Table<ProductCategory>(
  "product-categories",
  [new ColumnId("id"), new ColumnString("name", { maxLength: 20 })],
);
const orderProductsTable = new Table<OrderProduct>("order-products", [
  orderProductOrderColumn,
  orderProductProductColumn,
]);
const ordersTable = new Table<Order>("orders", [
  new ColumnId("id"),
  orderProductsCountColumn,
  orderCategoriesCountColumn,
]);
//#endregion

//#region Relations
const orderCategoriesCountRelation: Relation<Order, OrderProduct> = {
  sourceColumn: orderCategoriesCountColumn,
  sourceTable: ordersTable,
  targetTable: orderProductsTable,
};
const orderProductsCountRelation: Relation<Order, OrderProduct> = {
  sourceColumn: orderProductsCountColumn,
  sourceTable: ordersTable,
  targetTable: orderProductsTable,
};
const orderProductOrderRelation: Relation<OrderProduct, Order> = {
  sourceColumn: orderProductOrderColumn,
  sourceTable: orderProductsTable,
  targetTable: ordersTable,
};
const orderProductProductRelation: Relation<OrderProduct, Product> = {
  sourceColumn: orderProductProductColumn,
  sourceTable: orderProductsTable,
  targetTable: productsTable,
};
const productCategoryRelation: Relation<Product, ProductCategory> = {
  sourceColumn: productCategoryColumn,
  sourceTable: productsTable,
  targetTable: productCategoriesTable,
};
//#endregion

const tables: List<ITable<Any>> = [
  productCategoriesTable,
  productsTable,
  orderProductsTable,
  ordersTable,
];
const relations: List<Relation<Any, Any>> = [
  productCategoryRelation,
  orderProductOrderRelation,
  orderProductProductRelation,
  orderProductsCountRelation,
  orderCategoriesCountRelation,
];

describe("Table", () => {
  describe("utils", () => {
    describe("GeneratorGetMatrixDelegate", () => {
      it("Generates a map of lists, the map as the same keys of the given tablesMap param.", () => {
        const countsMap: Dictionary<number> = {
          [productCategoriesTable.name]: 10,
          [productsTable.name]: 50,
          [orderProductsTable.name]: 5,
          [ordersTable.name]: 1,
        };
        const data = DatabaseGetDataDelegate(tables, countsMap, relations);
        const dataKeys = Object.keys(data);
        expect(dataKeys.length).toBe(4);
        dataKeys.forEach((key) => {
          const { rows, table } = data[key];
          expect(table.name).toBe(key);
          expect(rows.length).toBe(countsMap[table.name]);
        });
        const productCategories = data[productCategoriesTable.name].rows;
        const products = data[productsTable.name].rows;
        const orderProducts = data[orderProductsTable.name].rows;
        const orders = data[ordersTable.name].rows;
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
    describe("TableGetRowsDelegate", () => {
      it("Generates 5 rows of {name: string}", () => {
        type RowTest = { name: string };
        const rows = TableGetRowsDelegate<RowTest>(
          [
            new ColumnString<RowTest>("name", {
              maxLength: 12,
              minLength: 4,
            }),
          ],
          5,
        );
        expect(rows.length).toBe(5);
        expect(rows.every((a) => objectHasKey(a, "name"))).toBeTruthy();
        expect(
          rows.every((a) => a.name.length >= 4 && a.name.length <= 12),
        ).toBeTruthy();
      });
      it("Generates 100 rows of `{id: number, name: string, surname: string, fullname: string, age: Nullable<number>, email: string active: boolean, registered: Date, expires: Date, type: RowType, color: string, scoreMax: number; score: number, phone: string, username: string}`", () => {
        enum RowType {
          base,
          standard,
          advanced,
        }
        type RowTest = {
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
          color: string;
          scoreMax: number;
          score: number;
          phone: string;
          username: string;
        };
        const rows = TableGetRowsDelegate<RowTest>(
          [
            new ColumnId<RowTest>("id"),
            new ColumnFirstName<RowTest>("name"),
            new ColumnLastName<RowTest>("surname"),
            new ColumnCustom<RowTest, string>(
              "fullname",
              (a) => `${a.name} ${a.surname}`,
            ),
            new ColumnNumber<RowTest>("age", { max: 90, nullable: true }),
            new ColumnEmailDependency<RowTest>("email", {
              firstNames: (a) => [a.name],
              lastNames: (a) => [a.surname],
            }),
            new ColumnBoolean<RowTest>("active"),
            new ColumnDate<RowTest>("registered"),
            new ColumnDateDependency<RowTest>("expires", {
              dateFrom: (a) => a.registered,
            }),
            new ColumnEnum<RowTest, RowType>("type", Object(RowType)),
            new ColumnColor<RowTest>("color"),
            new ColumnNumber<RowTest>("scoreMax", { max: 100 }),
            new ColumnNumberDependency<RowTest>("score", {
              max: (a) => a.scoreMax,
            }),
            new ColumnPattern<RowTest>("phone", "+000-00000"),
            new ColumnPattern<RowTest>("username", "a{8,12}"),
          ],
          100,
        );
        expect(rows.length).toBe(100);
        let lastRow: Nullable<RowTest> = null;
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
              `${a.name.toLowerCase()}.${a.surname.toLowerCase()}`,
            ),
          ).toBe(0);
          expect(isBoolean(a.active)).toBeTruthy();
          expect(isDate(a.registered)).toBeTruthy();
          expect(isDate(a.expires)).toBeTruthy();
          expect(a.expires.getTime()).toBeGreaterThanOrEqual(
            a.registered.getTime(),
          );
          expect(a.type in RowType).toBeTruthy();
          expect(a.color).toMatch(
            /^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0-9]\)$$/,
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
          ]);
          lastRow = a;
        });
        expect(rows.some((a) => isNumber(a.age))).toBeTruthy();
        expect(rows.some((a) => a.age === null)).toBeTruthy();
      });
    });
  });
});
