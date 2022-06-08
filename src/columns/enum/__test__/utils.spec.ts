import { List } from "@mantlebee/ts-core";
import { FdoColumnEnumValueDelegate } from "../utils";

enum Enumerative {
  first,
  second,
  third,
}

describe("FdoColumnEnum", () => {
  describe("utils", () => {
    describe("FdoColumnEnumValueDelegate", () => {
      it("Generates a random enumerative value", () => {
        const randoms: List<Enumerative> = [];
        for (let i = 0; i < 100; ++i)
          randoms.push(
            FdoColumnEnumValueDelegate({
              enumerative: Object(Enumerative),
            })
          );
        randoms.forEach((a) => {
          expect([0, 1, 2]).toContain(a);
        });
      });
    });
  });
});
