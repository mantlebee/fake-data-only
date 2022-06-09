import { FdoColumnStringOptions } from "../types";
import { FdoColumnStringValueDelegate } from "../utils";

const options: FdoColumnStringOptions = {
  includeLowercase: false,
  includeNumbers: false,
  includeSpecialChars: false,
  includeUppercase: false,
  maxLength: 10,
  minLength: 0,
};

describe("FdoColumnString", () => {
  describe("utils", () => {
    describe("FdoColumnStringValueDelegate", () => {
      it("Generates 5 lowercase chars", () => {
        const random = FdoColumnStringValueDelegate({
          ...options,
          includeLowercase: true,
          maxLength: 5,
          minLength: 5,
        });
        expect(/^[a-z]{5}$/.test(random)).toBeTruthy();
      });
      it("Generates a lowercase and uppercase string of length between 10 and 12 chars", () => {
        const random = FdoColumnStringValueDelegate({
          ...options,
          includeLowercase: true,
          includeUppercase: true,
          maxLength: 12,
          minLength: 10,
        });
        expect(/^([a-z]|[A-Z]){10,12}$/.test(random)).toBeTruthy();
      });
      it("Generates a string of 8 to 16 chars, lower/upper-case alphabet, numbers and special chars", () => {
        const random = FdoColumnStringValueDelegate({
          includeLowercase: true,
          includeNumbers: true,
          includeUppercase: true,
          includeSpecialChars: true,
          maxLength: 16,
          minLength: 8,
        });
        expect(/^.{8,16}$/.test(random)).toBeTruthy();
      });
    });
  });
});
