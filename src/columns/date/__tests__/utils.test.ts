import { getColumnDateValue } from "../utils";

const firstDate = new Date(1970, 0, 1, 0, 0, 0);

describe("ColumnDate", () => {
  describe("utils", () => {
    describe("getColumnDateValue", () => {
      it("Generates a random date", () => {
        const random = getColumnDateValue({});
        expect(random.getTime()).toBeGreaterThanOrEqual(firstDate.getTime());
        expect(random.getTime()).toBeLessThanOrEqual(Date.now());
      });
    });
  });
});
