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
        const random = FdoColumnEnumValueDelegate({
          enumerative: Enumerative,
        });
        expect(Object.values(Enumerative)).toContain(random);
      });
    });
  });
});
