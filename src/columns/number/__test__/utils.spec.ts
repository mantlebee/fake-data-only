import { FdoColumnNumberOptions } from "../types";
import { FdoColumnNumberValueDelegate } from "../utils";

const options: FdoColumnNumberOptions = {
  max: 10,
  min: 5,
};

describe("FdoColumnNumber", () => {
  describe("utils", () => {
    describe("FdoColumnNumberValueDelegate", () => {
      it("Generates a number between min and max", () => {
        const random = FdoColumnNumberValueDelegate(options);
        expect(random).toBeGreaterThanOrEqual(options.min);
        expect(random).toBeLessThanOrEqual(options.max);
      });
    });
  });
});
