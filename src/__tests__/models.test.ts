import { Any, createTypedKey, List } from "@mantlebee/ts-core";

import { ColumnId } from "@/columns";
import { Database, Table } from "@/models";
import { ColumnRelationLookup } from "@/relations";

type RowTest = { id: number };
type Category = RowTest & { name: string };
type Product = RowTest & { name: string; category: number };

describe("models", () => {
  describe("Database", () => {
    const categoriesTableKey = createTypedKey<Category>();
    const productsTableKey = createTypedKey<Product>();
    const categoriesTable = new Table<Category>(
      "categories",
      [new ColumnId("id")],
      categoriesTableKey
    );
    const productsTable = new Table<Product>(
      "products",
      [
        new ColumnId("id"),
        new ColumnRelationLookup("category", 0, categoriesTableKey, "id"),
      ],
      productsTableKey
    );
    const tables: List<Table<Any>> = [productsTable, categoriesTable];
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
    it("updates the relation columns values if there are relation columns", () => {
      const database = new Database(tables);
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
