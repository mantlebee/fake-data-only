import { FdoColumnColor } from "../models";

type Row = {
  name: string;
};

describe("FdoColumnColor", () => {
  describe("models", () => {
    describe("FdoColumnColor", () => {
      it("Generates a random color", () => {
        const colorColumn = new FdoColumnColor<Row>("name");
        const rgba = colorColumn.getValue();
        expect(rgba).toMatch(
          /^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0-9]\)$$/
        );
      });
    });
  });
});
