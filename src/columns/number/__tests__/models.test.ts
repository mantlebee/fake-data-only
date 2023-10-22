import { ColumnNumber } from "../models";

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
    describe("ColumnNumber", () => {
      it("Generates a random number, taking decimals, max and min from the passed row", () => {
        const dependantColumn = new ColumnNumber<RowTest>("max", (a) => ({
          decimals: a.decimals,
          max: a.max,
          min: a.min,
        }));
        const random = dependantColumn.getValue(row);
        expect(`${random}`.length).toBeGreaterThanOrEqual(2);
        expect(`${random}`.length).toBeLessThanOrEqual(5);
        expect(random).toBeGreaterThanOrEqual(row.min);
        expect(random).toBeLessThanOrEqual(row.max);
      });
    });
  });
});
