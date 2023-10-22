import { Any, List, NumericIdentityManager } from "@mantlebee/ts-core";
import { extractRandomItem } from "@mantlebee/ts-random";

import { Column, ColumnRelation, Database, Table } from "@/models";
import { Data, Relation } from "@/types";
import { ITable } from "..";

type RowTest = { id: number };
type Category = RowTest & { name: string };
type Product = RowTest & { name: string; category: number };

class ColumnTestId extends Column<RowTest, number> {
  private readonly idManager = new NumericIdentityManager(0);
  public getValue(row: { id: number }): number {
    return this.idManager.newValue();
  }
}

class ColumnRelationTestCategory extends ColumnRelation<
  Product,
  Category,
  number
> {
  public setValues(
    sourceRows: List<Product>,
    targetRows: List<Category>,
    data: Data
  ): void {
    const randomTargetRow = extractRandomItem(targetRows);
    sourceRows.forEach((a) => (a.category = randomTargetRow.id));
  }
}

describe("models", () => {
  describe("Column", () => {
    it("set default options if no options are passed to the constructor", () => {
      const column = new ColumnTestId("id");
      expect(column.options).toEqual({});
    });
  });
  describe("ColumnRelation", () => {
    it("returns the default value passed to the constructor", () => {
      const column = new ColumnRelationTestCategory("id", 42);
      expect(column.getValue({} as Product)).toBe(42);
    });
  });
  describe("Database", () => {
    const categoryRelationColumn = new ColumnRelationTestCategory(
      "category",
      0
    );
    const categoriesTable = new Table<Category>("categories", [
      new ColumnTestId("id"),
    ]);
    const productsTable = new Table<Product>("products", [
      new ColumnTestId("id"),
      categoryRelationColumn,
    ]);
    const tables: List<ITable<Any>> = [productsTable, categoriesTable];
    const relations: List<Relation<Any, Any>> = [
      {
        sourceColumn: categoryRelationColumn,
        sourceTable: productsTable,
        targetTable: categoriesTable,
      },
    ];
    it("generates a dataset with specific amount of rows for each table", () => {
      const database = new Database(tables);
      const data = database.getData({ categories: 5, products: 20 });
      expect(data.categories.rows).toHaveLength(5);
      expect(data.products.rows).toHaveLength(20);
    });
    it("generates 0 rows for a table not defined in the countsMap", () => {
      const database = new Database(tables);
      const data = database.getData({ categories: 5 });
      expect(data.products.rows).toHaveLength(0);
    });
    it("doesn't update the relation columns values if there are not relations for that columns", () => {
      const database = new Database(tables);
      const data = database.getData({ categories: 5, products: 20 });
      expect(data.products.rows.every((a) => a.category === 0)).toBeTruthy();
    });
    it("updates the relation columns values if there are relations for that columns", () => {
      const database = new Database(tables, relations);
      const data = database.getData({ categories: 5, products: 20 });
      expect(data.products.rows.every((a) => a.category !== 0)).toBeTruthy();
    });
  });
  describe("Table", () => {
    it("generates a specific amount of rows", () => {
      const table = new Table("products", [new ColumnTestId("id")]);
      const rows = table.getRows(42);
      expect(rows).toHaveLength(42);
    });
  });
});
