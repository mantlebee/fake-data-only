import { ColumnBoolean } from "../models";

type RowTest = {
  active: boolean;
};

describe("ColumnBoolean", () => {
  describe("models", () => {
    describe("ColumnBoolean", () => {
      it("Generates a random boolean", () => {
        const column = new ColumnBoolean<RowTest>("active");
        const value = column.getValue();
        expect([true, false]).toContain(value);
      });
    });
  });
});
