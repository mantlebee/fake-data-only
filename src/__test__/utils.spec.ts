import {
  isBoolean,
  isDate,
  isNumber,
  isString,
  KeyOf,
  objectHasKey,
} from "@mantlebee/ts-core";

import {
  FdoColumnBoolean,
  FdoColumnDate,
  FdoColumnNumber,
  FdoColumnString,
  FdoColumnStringOptions,
} from "@/columns";
import { FdoGeneratorGenerateDelegate } from "@/utils";

function getStringColumn<T>(
  name: KeyOf<T>,
  maxLength: number,
  minLength = 0,
  options?: FdoColumnStringOptions
): FdoColumnString<T> {
  return new FdoColumnString(name, {
    includeLowerCase: true,
    includeNumbers: false,
    includeUpperCase: false,
    includeSpecialChars: false,
    maxLength,
    minLength,
    ...options,
  });
}

describe("FdoGenerator", () => {
  describe("utils", () => {
    describe("FdoGeneratorGenerateDelegate", () => {
      it("Generates 5 rows of {name: string}", () => {
        type Row = { name: string };
        const rows = FdoGeneratorGenerateDelegate<Row>(
          [getStringColumn<Row>("name", 12, 4)],
          5
        );
        expect(rows.length).toBe(5);
        expect(rows.every((a) => objectHasKey(a, "name"))).toBeTruthy();
        expect(
          rows.every((a) => a.name.length >= 4 && a.name.length <= 12)
        ).toBeTruthy();
      });
      it("Generates 20 rows of {name: string, surname: string, age: number, active: boolean, registered: Date}", () => {
        type Row = {
          name: string;
          surname: string;
          age: number;
          active: boolean;
          registered: Date;
        };
        const rows = FdoGeneratorGenerateDelegate<Row>(
          [
            getStringColumn<Row>("name", 12, 4),
            getStringColumn<Row>("surname", 12, 4),
            new FdoColumnNumber<Row>("age", { max: 120 }),
            new FdoColumnBoolean("active"),
            new FdoColumnDate("registered", {}),
          ],
          20
        );
        expect(rows.length).toBe(20);
        rows.forEach((a) => {
          expect(isString(a.name)).toBeTruthy();
          expect(isString(a.surname)).toBeTruthy();
          expect(isNumber(a.age)).toBeTruthy();
          expect(isBoolean(a.active)).toBeTruthy();
          expect(isDate(a.registered)).toBeTruthy();
          expect(Object.keys(a)).toEqual([
            "name",
            "surname",
            "age",
            "active",
            "registered",
          ]);
        });
      });
    });
  });
});
