import { FdoColumnPattern } from "../models";

type Row = {
  name: string;
};

describe("FdoColumnPattern", () => {
  describe("models", () => {
    describe("FdoColumnPattern", () => {
      it("Generates a phone number compliant to +000-00000", () => {
        const patternColumn = new FdoColumnPattern<Row>("name", "+000-00000");
        const value = patternColumn.getValue();
        expect(value).toMatch(/^\+[0-9]{3}-[0-9]{5}$/);
      });
    });
  });
});
