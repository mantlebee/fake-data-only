import { List } from "@mantlebee/ts-core";

import { columnEnumGetValueDelegate } from "../utils";

enum Enumerative {
  first,
  second,
  third,
}

describe("ColumnEnum", () => {
  describe("utils", () => {
    describe("columnEnumGetValueDelegate", () => {
      it("Generates a random enumerative value", () => {
        const randoms: List<Enumerative> = [];
        for (let i = 0; i < 100; ++i)
          randoms.push(columnEnumGetValueDelegate(Object(Enumerative)));
        randoms.forEach((a) => {
          expect([0, 1, 2]).toContain(a);
        });
      });
    });
  });
});
