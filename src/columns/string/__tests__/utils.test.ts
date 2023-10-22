import { columnStringGetValueDelegate } from "../utils";

describe("ColumnString", () => {
  describe("utils", () => {
    describe("columnStringGetValueDelegate", () => {
      it("Generates a random string up to 10 chars", () => {
        const random = columnStringGetValueDelegate({
          maxLength: 10,
        });
        expect(/^.{0,10}$/.test(random)).toBeTruthy();
      });
      it("Generates 5 lowercase chars", () => {
        const random = columnStringGetValueDelegate({
          include: { lowercase: true },
          maxLength: 5,
          minLength: 5,
        });
        expect(/^[a-z]{5}$/.test(random)).toBeTruthy();
      });
      it("Generates a lowercase and uppercase string of length between 10 and 12 chars", () => {
        const random = columnStringGetValueDelegate({
          include: { lowercase: true, uppercase: true },
          maxLength: 12,
          minLength: 10,
        });
        expect(/^([a-z]|[A-Z]){10,12}$/.test(random)).toBeTruthy();
      });
    });
  });
});
