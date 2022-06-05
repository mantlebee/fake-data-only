import { isEmail, List } from "@mantlebee/ts-core";

import { FdoColumnString } from "@/columns";
import { FdoColumnEmailValueDelegate } from "../utils";

type Item = {
  domain: string;
  firstName: string;
  lastName: string;
  provider: string;
};

const item: Item = {
  domain: "com",
  firstName: "John",
  lastName: "Doe",
  provider: "gmail",
};

describe("FdoColumnEmail", () => {
  describe("utils", () => {
    describe("FdoColumnEmailValueDelegate", () => {
      it("Generates a random email", () => {
        const randoms: List<string> = [];
        for (let i = 0; i < 100; i++)
          randoms.push(FdoColumnEmailValueDelegate<Item>(item, {}, {}));
        expect(randoms.every(isEmail)).toBeTruthy();
      });
      it("Generates a random email, taking domain, firstName, lastname and provider from the passed item", () => {
        const domainColumn = { name: "domain" } as FdoColumnString<Item>;
        const firstNameColumn = { name: "firstName" } as FdoColumnString<Item>;
        const lastNameColumn = { name: "lastName" } as FdoColumnString<Item>;
        const providerColumn = { name: "provider" } as FdoColumnString<Item>;
        const random = FdoColumnEmailValueDelegate<Item>(
          item,
          {},
          {
            domain: domainColumn,
            firstName: firstNameColumn,
            lastName: lastNameColumn,
            provider: providerColumn,
          }
        );
        expect(random).toBe("john.doe@gmail.com");
      });
    });
  });
});
