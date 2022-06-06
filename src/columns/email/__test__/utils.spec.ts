import { isEmail, List } from "@mantlebee/ts-core";

import { FdoColumnString } from "@/columns";
import { FdoColumnEmailValueDelegate } from "../utils";

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
  describe("utils", () => {
    describe("FdoColumnEmailValueDelegate", () => {
      it("Generates a random email", () => {
        const randoms: List<string> = [];
        for (let i = 0; i < 100; i++)
          randoms.push(FdoColumnEmailValueDelegate<Item>(item, {}, {}));
        expect(randoms.every(isEmail)).toBeTruthy();
      });
      it("Generates a random email choosing a domain from the given list", () => {
        const randoms: List<string> = [];
        for (let i = 0; i < 100; i++)
          randoms.push(
            FdoColumnEmailValueDelegate<Item>(
              item,
              { domains: ["outlook.it", "outlook.com"] },
              {}
            )
          );
        expect(randoms.every(isEmail)).toBeTruthy();
        expect(randoms.every((a) => /outlook\.(it|com)$/.test(a))).toBeTruthy();
      });
      it("Generates a random email, taking domain, firstName, lastname and provider from the passed item", () => {
        const domainColumn = { name: "domain" } as FdoColumnString<Item>;
        const firstNameColumn = { name: "firstName" } as FdoColumnString<Item>;
        const lastNameColumn = { name: "lastName" } as FdoColumnString<Item>;
        const random = FdoColumnEmailValueDelegate<Item>(
          item,
          {},
          {
            domain: domainColumn,
            firstName: firstNameColumn,
            lastName: lastNameColumn,
          }
        );
        expect(random).toBe("john.doe@gmail.com");
      });
    });
  });
});
