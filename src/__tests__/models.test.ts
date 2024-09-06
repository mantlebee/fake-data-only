import { Any, List } from "@mantlebee/ts-core";

import { ColumnCustom, ColumnId } from "@/columns";
import { Relation, Database, Table } from "@/models";
import { RelationLookup } from "@/relations";

type RowTest = { id: number };
type Category = RowTest & { name: string };
type Product = RowTest & { name: string; category: number };

describe("models", () => {
  describe("Database", () => {
    const categoryRelationColumn = new ColumnCustom<Product, number>(
      "category",
      () => 0
    );
    const categoriesTable = new Table<Category>("categories", [
      new ColumnId("id"),
    ]);
    const productsTable = new Table<Product>("products", [
      new ColumnId("id"),
      categoryRelationColumn,
    ]);
    const tables: List<Table<Any>> = [productsTable, categoriesTable];
    const relations: List<Relation<Any, Any>> = [
      new RelationLookup(
        "category",
        productsTable.key,
        categoriesTable.key,
        "id"
      ),
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
      const table = new Table("products", [new ColumnId("id")]);
      const rows = table.getRows(42);
      expect(rows).toHaveLength(42);
    });
  });
});
