import { ColumnNumberDependency } from "../models";

type RowTest = {
  decimals: number;
  max: number;
  min: number;
};

const row: RowTest = {
  decimals: 2,
  max: 12,
  min: 5,
};

describe("ColumnNumber", () => {
  describe("models", () => {
    describe("ColumnNumberDependency", () => {
      it("Generates a random number, taking decimals, max and min from the passed row", () => {
        const dependantColumn = new ColumnNumberDependency<RowTest>("max", {
          decimals: (a) => a.decimals,
          max: (a) => a.max,
          min: (a) => a.min,
        });
        const random = dependantColumn.getValue(row);
        expect(`${random}`.length).toBeGreaterThanOrEqual(2);
        expect(`${random}`.length).toBeLessThanOrEqual(5);
        expect(random).toBeGreaterThanOrEqual(row.min);
        expect(random).toBeLessThanOrEqual(row.max);
      });
    });
  });
});
