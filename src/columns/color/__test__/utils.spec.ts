import { FdoColumnColorValueDelegate } from "../utils";

describe("FdoColumnColor", () => {
  describe("utils", () => {
    describe("FdoColumnColorValueDelegate", () => {
      it("Generates a random color", () => {
        const random = FdoColumnColorValueDelegate({});
        expect(
          /^rgb\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\)$$/.test(random)
        ).toBeTruthy();
      });
    });
  });
});
