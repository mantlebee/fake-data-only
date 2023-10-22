import { Any, List, NumericIdentityManager } from "@mantlebee/ts-core";
import { extractRandomItem } from "@mantlebee/ts-random";

import { Column, ColumnRelation, Database, Table } from "@/models";
import { Dataset, Relation } from "@/types";
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
    dataset: Dataset
  ): void {
    const randomTargetRow = extractRandomItem(targetRows);
    sourceRows.forEach((a) => (a.category = randomTargetRow.id));
  }
}

describe("models", () => {
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
    const tables: List<Table<Any>> = [productsTable, categoriesTable];
    const relations: List<Relation<Any, Any>> = [
      {
        sourceColumn: categoryRelationColumn,
        sourceTable: productsTable,
        targetTable: categoriesTable,
      },
    ];
    it("generates a dataset with specific amount of rows for each table", () => {
      const database = new Database(tables);
      const dataset = database.getDataset({ categories: 5, products: 20 });
      expect(dataset.categories.rows).toHaveLength(5);
      expect(dataset.products.rows).toHaveLength(20);
    });
    it("generates 0 rows for a table not defined in the countsMap", () => {
      const database = new Database(tables);
      const dataset = database.getDataset({ categories: 5 });
      expect(dataset.products.rows).toHaveLength(0);
    });
    it("doesn't update the relation columns values if there are not relations for that columns", () => {
      const database = new Database(tables);
      const dataset = database.getDataset({ categories: 5, products: 20 });
      expect(dataset.products.rows.every((a) => a.category === 0)).toBeTruthy();
    });
    it("updates the relation columns values if there are relations for that columns", () => {
      const database = new Database(tables, relations);
      const dataset = database.getDataset({ categories: 5, products: 20 });
      expect(dataset.products.rows.every((a) => a.category !== 0)).toBeTruthy();
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
