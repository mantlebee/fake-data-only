import { Any, List } from "@mantlebee/ts-core";

import { IdColumn } from "@/columns";
import { Database, Table } from "@/models";
import { LookupRelationColumn } from "@/relations";
import { createTableKey } from "@/utils";

type Category = { id: number; name: string };
type Product = { id: number; name: string; category: number };
const categoriesTableKey = createTableKey<Category>("categories");
const productsTableKey = createTableKey<Product>("products");

describe("models", () => {
  describe("Database", () => {
    const categoriesTable = new Table<Category>(categoriesTableKey, [
      new IdColumn("id"),
    ]);
    const productsTable = new Table<Product>(productsTableKey, [
      new IdColumn("id"),
      new LookupRelationColumn("category", 0, categoriesTableKey, "id"),
    ]);
    const tables: List<Table<Any>> = [productsTable, categoriesTable];
    it("generates a dataset with specific amount of rows for each table", () => {
      const dataset = new Database(tables)
        .seed({
          [categoriesTableKey]: 5,
          [productsTableKey]: 20,
        })
        .toJSON();
      expect(dataset[categoriesTableKey]).toHaveLength(5);
      expect(dataset[productsTableKey]).toHaveLength(20);
    });
    it("generates 0 rows for a table not defined in the countsMap", () => {
      const dataset = new Database(tables)
        .seed({ [categoriesTableKey]: 5 })
        .toJSON();
      expect(dataset[productsTableKey]).toHaveLength(0);
    });
    it("updates the relation columns values if there are relation columns", () => {
      const dataset = new Database(tables)
        .seed({
          [categoriesTableKey]: 5,
          [productsTableKey]: 20,
        })
        .toJSON();
      expect(
        dataset[productsTableKey].every((a) => a.category !== 0)
      ).toBeTruthy();
    });
  });
  describe("Table", () => {
    it("has no rows, on create", () => {
      const rows = new Table(productsTableKey, [new IdColumn("id")]).getRows();
      expect(rows).toHaveLength(0);
    });
    it("generates a specific amount of rows", () => {
      const rows = new Table(productsTableKey, [new IdColumn("id")])
        .seed(42)
        .getRows();
      expect(rows).toHaveLength(42);
    });
  });
});
