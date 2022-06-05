import { isEmail, List } from "@mantlebee/ts-core";

import { FdoColumnEmailValueDelegate } from "../utils";

describe("FdoColumnEmail", () => {
  describe("utils", () => {
    describe("FdoColumnEmailValueDelegate", () => {
      it("Generates a random email", () => {
        const randoms: List<string> = [];
        for (let i = 0; i < 100; i++)
          randoms.push(FdoColumnEmailValueDelegate({}));
        expect(randoms.every(isEmail)).toBeTruthy();
      });
    });
  });
});
