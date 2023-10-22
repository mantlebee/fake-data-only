import { columnDateGetValueDelegate } from "../utils";

type RowTest = {
  dateFrom: Date;
  dateTo: Date;
};

const row: RowTest = {
  dateFrom: new Date(2022, 4, 3, 0, 0, 0),
  dateTo: new Date(2022, 4, 3, 23, 59, 59),
};

const firstDate = new Date(1970, 0, 1, 0, 0, 0);

describe("ColumnDate", () => {
  describe("utils", () => {
    describe("columnDateGetValueDelegate", () => {
      it("Generates a random date", () => {
        const random = columnDateGetValueDelegate({});
        expect(random.getTime()).toBeGreaterThanOrEqual(firstDate.getTime());
        expect(random.getTime()).toBeLessThanOrEqual(Date.now());
      });
    });
  });
});
