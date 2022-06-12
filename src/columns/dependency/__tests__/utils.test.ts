import { ConstructorOf, List } from "@mantlebee/ts-core";

import {
  FdoColumnDate,
  FdoColumnDateOptions,
  FdoColumnNumber,
  FdoColumnNumberOptions,
} from "@/columns";

import { FdoColumnDependencyGetValueDelegate } from "../utils";

type Row = {
  activatedOn: Date;
  exipresOn: Date;
  slotsTotal: number;
  slotsAvailable: number;
};

const row: Row = {
  activatedOn: new Date(2022, 0, 1, 0, 0, 0),
  exipresOn: new Date(2022, 11, 31, 23, 59, 59),
  slotsAvailable: 2,
  slotsTotal: 10,
};

describe("FdoColumnDependency", () => {
  describe("utils", () => {
    describe("FdoColumnDependencyGetValueDelegate", () => {
      it("Generates a random number value, using row.slotsAvailable and row.slotsTotal as range", () => {
        const randoms: List<number> = [];
        for (let i = 0; i < 100; ++i)
          randoms.push(
            FdoColumnDependencyGetValueDelegate<
              Row,
              number,
              FdoColumnNumberOptions,
              ConstructorOf<FdoColumnNumber<Row>>
            >(row, FdoColumnNumber, {
              max: (a) => a.slotsTotal,
              min: (a) => a.slotsAvailable,
            })
          );
        randoms.forEach((a) => {
          expect(a).toBeGreaterThanOrEqual(row.slotsAvailable);
          expect(a).toBeLessThanOrEqual(row.slotsTotal);
        });
      });
      it("Generates a random date value, using row.activatedOn and row.exipresOn as range", () => {
        const randoms: List<Date> = [];
        for (let i = 0; i < 100; ++i)
          randoms.push(
            FdoColumnDependencyGetValueDelegate<
              Row,
              Date,
              FdoColumnDateOptions,
              ConstructorOf<FdoColumnDate<Row>>
            >(row, FdoColumnDate, {
              dateFrom: (a) => a.activatedOn,
              dateTo: (a) => a.exipresOn,
            })
          );
        randoms.forEach((a) => {
          expect(a.getTime()).toBeGreaterThanOrEqual(row.activatedOn.getTime());
          expect(a.getTime()).toBeLessThanOrEqual(row.exipresOn.getTime());
        });
      });
    });
  });
});
