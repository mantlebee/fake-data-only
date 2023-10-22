import { ColumnCustom } from "../models";

type RowTest = {
  name: string;
};

describe("ColumnCustom", () => {
  describe("models", () => {
    describe("ColumnCustom", () => {
      it("Generates a custom value using a delegate", () => {
        const delegate = jest.fn(() => "value");
        const column = new ColumnCustom<RowTest, string>("name", delegate);
        const row = {} as RowTest;
        const value = column.getValue(row);
        expect(delegate).toBeCalledWith(row);
        expect(value).toBe("value");
      });
    });
  });
});
