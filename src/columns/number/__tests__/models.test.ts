import { FdoColumnNumberDependency } from "../models";

type Item = {
  decimals: number;
  max: number;
  min: number;
};

const item: Item = {
  decimals: 2,
  max: 12,
  min: 5,
};

describe("FdoColumnNumber", () => {
  describe("models", () => {
    describe("FdoColumnNumberDependency", () => {
      it("Generates a random number, taking decimals, max and min from the passed item", () => {
        const dependantColumn = new FdoColumnNumberDependency<Item>("max", {
          decimals: (a) => a.decimals,
          max: (a) => a.max,
          min: (a) => a.min,
        });
        const random = dependantColumn.value(item);
        expect(`${random}`.length).toBeGreaterThanOrEqual(2);
        expect(`${random}`.length).toBeLessThanOrEqual(5);
        expect(random).toBeGreaterThanOrEqual(item.min);
        expect(random).toBeLessThanOrEqual(item.max);
      });
    });
  });
});
