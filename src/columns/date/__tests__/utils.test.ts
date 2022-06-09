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
        const random = FdoColumnDateValueDelegate();
        expect(random.getTime()).toBeGreaterThanOrEqual(firstDate.getTime());
        expect(random.getTime()).toBeLessThanOrEqual(Date.now());
      });
    });
  });
});
