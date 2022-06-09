import { IFdoColumn } from "@/interfaces";

import { FdoColumnDateValueDelegate } from "../utils";

type Item = {
  dateFrom: Date;
  dateTo: Date;
};

const item: Item = {
  dateFrom: new Date(2022, 4, 3, 0, 0, 0),
  dateTo: new Date(2022, 4, 3, 23, 59, 59),
};

const firstDate = new Date(1970, 0, 1, 0, 0, 0);

describe("FdoColumnDate", () => {
  describe("utils", () => {
    describe("FdoColumnDateValueDelegate", () => {
      it("Generates a random date", () => {
        const random = FdoColumnDateValueDelegate(item, {});
        expect(random.getTime()).toBeGreaterThanOrEqual(firstDate.getTime());
        expect(random.getTime()).toBeLessThanOrEqual(Date.now());
      });
      it("Generates a random date, using startFrom e startTo from passed item", () => {
        const dateFromColumn = { name: "dateFrom" } as IFdoColumn<Item, Date>;
        const dateToColumn = { name: "dateTo" } as IFdoColumn<Item, Date>;
        const random = FdoColumnDateValueDelegate<Item>(item, {
          dependencies: {
            dateFrom: dateFromColumn,
            dateTo: dateToColumn,
          },
        });
        expect(random.getTime()).toBeGreaterThanOrEqual(
          item.dateFrom.getTime()
        );
        expect(random.getTime()).toBeLessThanOrEqual(item.dateTo.getTime());
      });
    });
  });
});
