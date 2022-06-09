import { FdoColumnDateDependency } from "../models";

type Item = {
  dateFrom: Date;
  dateTo: Date;
};

const item: Item = {
  dateFrom: new Date(2022, 4, 3, 0, 0, 0),
  dateTo: new Date(2022, 4, 3, 23, 59, 59),
};

describe("FdoColumnDate", () => {
  describe("models", () => {
    describe("FdoColumnDateDependency", () => {
      it("Generates a random date, using startFrom e startTo from passed item", () => {
        const dependantColumn = new FdoColumnDateDependency<Item>("dateFrom", {
          dateFrom: (a) => item.dateFrom,
          dateTo: (a) => a.dateTo,
        });
        const random = dependantColumn.value(item);
        expect(random.getTime()).toBeGreaterThanOrEqual(
          item.dateFrom.getTime()
        );
        expect(random.getTime()).toBeLessThanOrEqual(item.dateTo.getTime());
      });
    });
  });
});
