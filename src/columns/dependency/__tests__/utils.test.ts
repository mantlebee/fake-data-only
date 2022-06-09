import { ConstructorOf, List } from "@mantlebee/ts-core";

import {
  FdoColumnDate,
  FdoColumnDateOptions,
  FdoColumnNumber,
  FdoColumnNumberOptions,
} from "@/columns";

import { FdoColumnDependencyValueDelegate } from "../utils";

type Item = {
  activatedOn: Date;
  exipresOn: Date;
  slotsTotal: number;
  slotsAvailable: number;
};

const item: Item = {
  activatedOn: new Date(2022, 0, 1, 0, 0, 0),
  exipresOn: new Date(2022, 11, 31, 23, 59, 59),
  slotsAvailable: 2,
  slotsTotal: 10,
};

describe("FdoColumnDependency", () => {
  describe("utils", () => {
    describe("FdoColumnDependencyValueDelegate", () => {
      it("Generates a random number value, using item.slotsAvailable and item.slotsTotal as range", () => {
        const randoms: List<number> = [];
        for (let i = 0; i < 100; ++i)
          randoms.push(
            FdoColumnDependencyValueDelegate<
              Item,
              number,
              FdoColumnNumberOptions,
              ConstructorOf<FdoColumnNumber<Item>>
            >(item, FdoColumnNumber, {
              max: (a) => a.slotsTotal,
              min: (a) => a.slotsAvailable,
            })
          );
        randoms.forEach((a) => {
          expect(a).toBeGreaterThanOrEqual(item.slotsAvailable);
          expect(a).toBeLessThanOrEqual(item.slotsTotal);
        });
      });
      it("Generates a random date value, using item.activatedOn and item.exipresOn as range", () => {
        const randoms: List<Date> = [];
        for (let i = 0; i < 100; ++i)
          randoms.push(
            FdoColumnDependencyValueDelegate<
              Item,
              Date,
              FdoColumnDateOptions,
              ConstructorOf<FdoColumnDate<Item>>
            >(item, FdoColumnDate, {
              dateFrom: (a) => a.activatedOn,
              dateTo: (a) => a.exipresOn,
            })
          );
        randoms.forEach((a) => {
          expect(a.getTime()).toBeGreaterThanOrEqual(
            item.activatedOn.getTime()
          );
          expect(a.getTime()).toBeLessThanOrEqual(item.exipresOn.getTime());
        });
      });
    });
  });
});
