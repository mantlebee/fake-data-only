import { ColumnDateGetValueDelegate } from "../utils";

type Row = {
  dateFrom: Date;
  dateTo: Date;
};

const row: Row = {
  dateFrom: new Date(2022, 4, 3, 0, 0, 0),
  dateTo: new Date(2022, 4, 3, 23, 59, 59),
};

const firstDate = new Date(1970, 0, 1, 0, 0, 0);

describe("ColumnDate", () => {
  describe("utils", () => {
    describe("ColumnDateGetValueDelegate", () => {
      it("Generates a random date", () => {
        const random = ColumnDateGetValueDelegate();
        expect(random.getTime()).toBeGreaterThanOrEqual(firstDate.getTime());
        expect(random.getTime()).toBeLessThanOrEqual(Date.now());
      });
    });
  });
});
