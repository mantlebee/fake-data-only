import {
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
  FdoColumnBoolean,
  FdoColumnColor,
  FdoColumnCustom,
  FdoColumnDate,
  FdoColumnDateDependency,
  FdoColumnEmailDependency,
  FdoColumnEnum,
  FdoColumnFirstName,
  FdoColumnId,
  FdoColumnLastName,
  FdoColumnNumber,
  FdoColumnNumberDependency,
  FdoColumnPattern,
  FdoColumnString,
} from "@/columns";
import {
  FdoRelationCount,
  FdoRelationCustom,
  FdoRelationValue,
} from "@/relations";
import { FdoMatrixRow } from "@/types";
import { FdoTableGetRowsDelegate } from "@/utils";

import { FdoTable } from "../models";
import { FdoGeneratorGetMatrixDelegate } from "../utils";

type Product = { categoryId: number; id: number; name: string };
type ProductCategory = { id: number; name: string };
type Order = { categoriesCount: number; id: number; productsCount: number };
type OrderProduct = { orderId: number; productId: number };

const productCategoriesTable = new FdoTable<ProductCategory>(
  "product-categories",
  [new FdoColumnId("id"), new FdoColumnString("name", { maxLength: 20 })]
);
const productsTable = new FdoTable<Product>("products", [
  new FdoColumnId("id"),
  new FdoColumnString("name", { maxLength: 20 }),
]);
const orderProductsTable = new FdoTable<OrderProduct>("order-products", []);
const ordersTable = new FdoTable<Order>("orders", [new FdoColumnId("id")]);

const productCategoryRelation = new FdoRelationValue<Product, ProductCategory>(
  "categoryId",
  productsTable,
  productCategoriesTable,
  "id"
);
const orderProductOrderRelation = new FdoRelationValue<OrderProduct, Order>(
  "orderId",
  orderProductsTable,
  ordersTable,
  "id"
);
const orderProductProductRelation = new FdoRelationValue<OrderProduct, Product>(
  "productId",
  orderProductsTable,
  productsTable,
  "id"
);
const orderProductsCountRelation = new FdoRelationCount<Order, OrderProduct>(
  "productsCount",
  ordersTable,
  orderProductsTable,
  (o, op) => op.orderId === o.id
);
const orderCategoriesCountRelations = new FdoRelationCustom<
  Order,
  OrderProduct,
  number
>(
  "categoriesCount",
  ordersTable,
  orderProductsTable,
  (order, orderProducts, matrix) => {
    // Product ids of the order
    const productsIds = orderProducts
      .filter((a) => a.orderId === order.id)
      .map((a) => a.productId);
    // Products of the order
    const products = (matrix.find(
      (a) => a.table === productsTable
    ) as FdoMatrixRow<Product>).rows;
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

describe("FdoTable", () => {
  describe("utils", () => {
    describe("FdoGeneratorGetMatrixDelegate", () => {
      it("Generates a map of lists, the map as the same keys of the given tablesMap param.", () => {
        const rowsNumberMap: Dictionary<number> = {
          [productCategoriesTable.name]: 10,
          [productsTable.name]: 50,
          [orderProductsTable.name]: 5,
          [ordersTable.name]: 1,
        };
        const matrix = FdoGeneratorGetMatrixDelegate(
          tables,
          rowsNumberMap,
          relations
        );
        expect(matrix.length).toBe(4);
        matrix.forEach((matrixItem, index) => {
          expect(matrixItem.table).toBe(tables[index]);
          expect(matrixItem.rows.length).toBe(
            rowsNumberMap[matrixItem.table.name]
          );
        });
        const productCategories = matrix[0].rows;
        const products = matrix[1].rows;
        const orderProducts = matrix[2].rows;
        const orders = matrix[3].rows;
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
    describe("FdoTableGetRowsDelegate", () => {
      it("Generates 5 rows of {name: string}", () => {
        type Row = { name: string };
        const rows = FdoTableGetRowsDelegate<Row>(
          [
            new FdoColumnString<Row>("name", {
              maxLength: 12,
              minLength: 4,
            }),
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
          color: string;
          scoreMax: number;
          score: number;
          phone: string;
          username: string;
        };
        const rows = FdoTableGetRowsDelegate<Row>(
          [
            new FdoColumnId<Row>("id"),
            new FdoColumnFirstName<Row>("name"),
            new FdoColumnLastName<Row>("surname"),
            new FdoColumnCustom<Row, string>(
              "fullname",
              (a) => `${a.name} ${a.surname}`
            ),
            new FdoColumnNumber<Row>("age", { max: 90 }),
            new FdoColumnEmailDependency<Row>("email", {
              firstNames: (a) => [a.name],
              lastNames: (a) => [a.surname],
            }),
            new FdoColumnBoolean<Row>("active"),
            new FdoColumnDate<Row>("registered"),
            new FdoColumnDateDependency<Row>("expires", {
              dateFrom: (a) => a.registered,
            }),
            new FdoColumnEnum<Row, RowType>("type", Object(RowType)),
            new FdoColumnColor<Row>("color"),
            new FdoColumnNumber<Row>("scoreMax", { max: 100 }),
            new FdoColumnNumberDependency<Row>("score", {
              max: (a) => a.scoreMax,
            }),
            new FdoColumnPattern<Row>("phone", "+000-00000"),
            new FdoColumnPattern<Row>("username", "a{8,12}"),
          ],
          100,
          { nullables: ["age"] }
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
          expect(a.color).toMatch(
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
          ]);
          lastRow = a;
        });
        expect(rows.some((a) => isNumber(a.age))).toBeTruthy();
        expect(rows.some((a) => a.age === null)).toBeTruthy();
      });
    });
  });
});
