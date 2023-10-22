import { ColumnEmail } from "../models";

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
    describe("ColumnEmail", () => {
      it("Generates a random email, taking domain, firstName and lastname from the passed row", () => {
        const dependantColumn = new ColumnEmail<RowTest>("domain", (a) => ({
          domains: [a.domain],
          firstNames: [a.firstName],
          lastNames: [a.lastName],
        }));
        const random = dependantColumn.getValue(row);
        expect(random).toBe("john.doe@gmail.com");
      });
    });
  });
});
