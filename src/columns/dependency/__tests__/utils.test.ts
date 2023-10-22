import { ConstructorOf, List } from "@mantlebee/ts-core";

import {
  ColumnDate,
  ColumnDateOptions,
  ColumnNumber,
  ColumnNumberOptions,
} from "@/columns";

import { columnDependencyGetValueDelegate } from "../utils";

type RowTest = {
  activatedOn: Date;
  exipresOn: Date;
  slotsTotal: number;
  slotsAvailable: number;
};

const row: RowTest = {
  activatedOn: new Date(2022, 0, 1, 0, 0, 0),
  exipresOn: new Date(2022, 11, 31, 23, 59, 59),
  slotsAvailable: 2,
  slotsTotal: 10,
};

describe("ColumnDependency", () => {
  describe("utils", () => {
    describe("columnDependencyGetValueDelegate", () => {
      it("Generates a random number value, using row.slotsAvailable and row.slotsTotal as range", () => {
        const randoms: List<number> = [];
        for (let i = 0; i < 100; ++i)
          randoms.push(
            columnDependencyGetValueDelegate<
              RowTest,
              number,
              ColumnNumberOptions,
              ConstructorOf<ColumnNumber<RowTest>>
            >(row, ColumnNumber, {
              max: (a) => a.slotsTotal,
              min: (a) => a.slotsAvailable,
            }),
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
            columnDependencyGetValueDelegate<
              RowTest,
              Date,
              ColumnDateOptions,
              ConstructorOf<ColumnDate<RowTest>>
            >(row, ColumnDate, {
              dateFrom: (a) => a.activatedOn,
              dateTo: (a) => a.exipresOn,
            }),
          );
        randoms.forEach((a) => {
          expect(a.getTime()).toBeGreaterThanOrEqual(row.activatedOn.getTime());
          expect(a.getTime()).toBeLessThanOrEqual(row.exipresOn.getTime());
        });
      });
    });
  });
});
