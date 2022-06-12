import { isEmail, List } from "@mantlebee/ts-core";

import { FdoColumnEmailGetValueDelegate } from "../utils";

describe("FdoColumnEmail", () => {
  describe("utils", () => {
    describe("FdoColumnEmailGetValueDelegate", () => {
      it("Generates a random email", () => {
        const randoms: List<string> = [];
        for (let i = 0; i < 100; i++)
          randoms.push(FdoColumnEmailGetValueDelegate());
        expect(randoms.every(isEmail)).toBeTruthy();
      });
      it("Generates a random email choosing a domain from the given list", () => {
        const randoms: List<string> = [];
        for (let i = 0; i < 100; i++)
          randoms.push(
            FdoColumnEmailGetValueDelegate({
              domains: ["outlook.it", "outlook.com"],
            })
          );
        expect(randoms.every(isEmail)).toBeTruthy();
        expect(randoms.every((a) => /outlook\.(it|com)$/.test(a))).toBeTruthy();
      });
    });
  });
});
