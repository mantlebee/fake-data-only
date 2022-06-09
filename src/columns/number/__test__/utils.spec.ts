import { numberIsInteger } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnNumberValueDelegate } from "../utils";

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
  describe("utils", () => {
    describe("FdoColumnNumberValueDelegate", () => {
      it("Generates an integer number between 0 and 10", () => {
        const random = FdoColumnNumberValueDelegate<Item>(item, { max: 10 });
        expect(numberIsInteger(random)).toBeTruthy();
        expect(random).toBeGreaterThanOrEqual(0);
        expect(random).toBeLessThanOrEqual(10);
      });
      it("Generates an integer number between 5 and 10", () => {
        const random = FdoColumnNumberValueDelegate<Item>(item, {
          max: 10,
          min: 5,
        });
        expect(numberIsInteger(random)).toBeTruthy();
        expect(random).toBeGreaterThanOrEqual(5);
        expect(random).toBeLessThanOrEqual(10);
      });
      it("Generates a float number between 5 and 10, with 2 digits after the decimals point", () => {
        const random = FdoColumnNumberValueDelegate<Item>(item, {
          decimals: 2,
          max: 10,
          min: 5,
        });
        expect(`${random}`.length).toBeGreaterThanOrEqual(2);
        expect(`${random}`.length).toBeLessThanOrEqual(5);
        expect(random).toBeGreaterThanOrEqual(5);
        expect(random).toBeLessThanOrEqual(10);
      });
      it("Generates a random number, taking decimals, max and min from the passed item", () => {
        const decimalsColumn = { name: "decimals" } as IFdoColumn<Item, number>;
        const maxColumn = { name: "max" } as IFdoColumn<Item, number>;
        const minColumn = { name: "min" } as IFdoColumn<Item, number>;
        const random = FdoColumnNumberValueDelegate<Item>(item, {
          max: 0,
          dependencies: {
            decimals: decimalsColumn,
            max: maxColumn,
            min: minColumn,
          },
        });
        expect(`${random}`.length).toBeGreaterThanOrEqual(2);
        expect(`${random}`.length).toBeLessThanOrEqual(5);
        expect(random).toBeGreaterThanOrEqual(item.min);
        expect(random).toBeLessThanOrEqual(item.max);
      });
    });
  });
});
