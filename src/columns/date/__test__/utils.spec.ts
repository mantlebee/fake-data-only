import { FdoColumnDateValueDelegate } from "../utils";

const firstDate = new Date(1970, 0, 1, 0, 0, 0);

describe("FdoColumnDate", () => {
  describe("utils", () => {
    describe("FdoColumnDateValueDelegate", () => {
      it("Generates a random date", () => {
        const random = FdoColumnDateValueDelegate({});
        expect(random.getTime()).toBeGreaterThanOrEqual(firstDate.getTime());
        expect(random.getTime()).toBeLessThanOrEqual(Date.now());
      });
    });
  });
});
