import { ColumnColor } from "../models";

type RowTest = {
  name: string;
};

describe("ColumnColor", () => {
  describe("models", () => {
    describe("ColumnColor", () => {
      it("Generates a random color", () => {
        const colorColumn = new ColumnColor<RowTest>("name");
        const rgba = colorColumn.getValue();
        expect(rgba).toMatch(
          /^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0-9]\)$$/,
        );
      });
    });
  });
});
