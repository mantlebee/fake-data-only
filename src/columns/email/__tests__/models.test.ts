import { FdoColumnEmailDependency } from "../models";

type Item = {
  domain: string;
  firstName: string;
  lastName: string;
};

const item: Item = {
  domain: "gmail.com",
  firstName: "John",
  lastName: "Doe",
};

describe("FdoColumnEmail", () => {
  describe("models", () => {
    describe("FdoColumnEmailDependency", () => {
      it("Generates a random email, taking domain, firstName and lastname from the passed item", () => {
        const dependantColumn = new FdoColumnEmailDependency<Item>("domain", {
          domains: (a) => [a.domain],
          firstNames: (a) => [a.firstName],
          lastNames: (a) => [a.lastName],
        });
        const random = dependantColumn.value(item);
        expect(random).toBe("john.doe@gmail.com");
      });
    });
  });
});
