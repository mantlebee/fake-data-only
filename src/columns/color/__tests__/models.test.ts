import { ColumnColor } from "../models";

type RowTest = {
  name: string;
};

describe("ColumnColor", () => {
  describe("models", () => {
    describe("ColumnColor", () => {
      it("Generates a random IColor instance", () => {
        const column = new ColumnColor<RowTest>("name");
        const value = column.getValue();
        const rgba = value.rgba();
        expect(rgba).toMatch(
          /^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0-9]\)$$/
        );
      });
    });
  });
});
