import { numberIsInteger } from "@mantlebee/ts-core";

import { FdoColumnNumberGetValueDelegate } from "../utils";

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
  describe("utils", () => {
    describe("FdoColumnNumberGetValueDelegate", () => {
      it("Generates an integer number between 0 and 10", () => {
        const random = FdoColumnNumberGetValueDelegate({ max: 10 });
        expect(numberIsInteger(random)).toBeTruthy();
        expect(random).toBeGreaterThanOrEqual(0);
        expect(random).toBeLessThanOrEqual(10);
      });
      it("Generates an integer number between 5 and 10", () => {
        const random = FdoColumnNumberGetValueDelegate({
          max: 10,
          min: 5,
        });
        expect(numberIsInteger(random)).toBeTruthy();
        expect(random).toBeGreaterThanOrEqual(5);
        expect(random).toBeLessThanOrEqual(10);
      });
      it("Generates a float number between 5 and 10, with 2 digits after the decimals point", () => {
        const random = FdoColumnNumberGetValueDelegate({
          decimals: 2,
          max: 10,
          min: 5,
        });
        expect(`${random}`.length).toBeGreaterThanOrEqual(2);
        expect(`${random}`.length).toBeLessThanOrEqual(5);
        expect(random).toBeGreaterThanOrEqual(5);
        expect(random).toBeLessThanOrEqual(10);
      });
    });
  });
});
