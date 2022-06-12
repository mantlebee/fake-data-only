import { FdoColumnNumberDependency } from "../models";

type Row = {
  decimals: number;
  max: number;
  min: number;
};

const row: Row = {
  decimals: 2,
  max: 12,
  min: 5,
};

describe("FdoColumnNumber", () => {
  describe("models", () => {
    describe("FdoColumnNumberDependency", () => {
      it("Generates a random number, taking decimals, max and min from the passed row", () => {
        const dependantColumn = new FdoColumnNumberDependency<Row>("max", {
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
