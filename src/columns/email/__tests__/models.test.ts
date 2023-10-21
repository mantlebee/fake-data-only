import { ColumnEmailDependency } from "../models";

type RowTest = {
  domain: string;
  firstName: string;
  lastName: string;
};

const row: RowTest = {
  domain: "gmail.com",
  firstName: "John",
  lastName: "Doe",
};

describe("ColumnEmail", () => {
  describe("models", () => {
    describe("ColumnEmailDependency", () => {
      it("Generates a random email, taking domain, firstName and lastname from the passed row", () => {
        const dependantColumn = new ColumnEmailDependency<RowTest>("domain", {
          domains: (a) => [a.domain],
          firstNames: (a) => [a.firstName],
          lastNames: (a) => [a.lastName],
        });
        const random = dependantColumn.getValue(row);
        expect(random).toBe("john.doe@gmail.com");
      });
    });
  });
});
