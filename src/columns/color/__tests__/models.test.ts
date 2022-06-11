import { FdoColumnColor } from "../models";

type Item = {
  name: string;
};

describe("FdoColumnColor", () => {
  describe("models", () => {
    describe("FdoColumnColor", () => {
      it("Generates a random color", () => {
        const colorColumn = new FdoColumnColor<Item>("name");
        const rgba = colorColumn.value();
        expect(
          /^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0-9]\)$$/.test(rgba)
        ).toBeTruthy();
      });
    });
  });
});
