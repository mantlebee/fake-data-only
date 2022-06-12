import { FdoColumnEmailDependency } from "../models";

type Row = {
  domain: string;
  firstName: string;
  lastName: string;
};

const row: Row = {
  domain: "gmail.com",
  firstName: "John",
  lastName: "Doe",
};

describe("FdoColumnEmail", () => {
  describe("models", () => {
    describe("FdoColumnEmailDependency", () => {
      it("Generates a random email, taking domain, firstName and lastname from the passed row", () => {
        const dependantColumn = new FdoColumnEmailDependency<Row>("domain", {
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
