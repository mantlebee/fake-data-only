import { ColumnPattern } from "../models";

type RowTest = {
  name: string;
};

describe("ColumnPattern", () => {
  describe("models", () => {
    describe("ColumnPattern", () => {
      it("Generates a phone number compliant to +000-00000", () => {
        const patternColumn = new ColumnPattern<RowTest>("name", "+000-00000");
        const value = patternColumn.getValue();
        expect(value).toMatch(/^\+[0-9]{3}-[0-9]{5}$/);
      });
    });
  });
});
