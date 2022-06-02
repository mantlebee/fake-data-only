import { FdoColumnStringOptions } from "../types";
import { FdoColumnStringValueDelegate } from "../utils";

const options: FdoColumnStringOptions = {
  includeLowerCase: false,
  includeNumbers: false,
  includeSpecialChars: false,
  includeUpperCase: false,
  maxLength: 10,
  minLength: 0,
};

describe("FdoColumnString", () => {
  describe("utils", () => {
    describe("FdoColumnStringValueDelegate", () => {
      it("Generates 5 lowercase chars", () => {
        const random = FdoColumnStringValueDelegate({
          ...options,
          includeLowerCase: true,
          maxLength: 5,
          minLength: 5,
        });
        expect(random.length).toBe(5);
        expect(/^[a-z]*$/.test(random)).toBeTruthy();
      });
    });
  });
});
