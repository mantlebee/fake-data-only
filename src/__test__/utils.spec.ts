import { KeyOf, objectHasKey } from "@mantlebee/ts-core";

import {
  FdoColumnBoolean,
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
      it("Generates 20 rows of {name: string, surname: string, age: number, active: boolean}", () => {
        type Row = {
          name: string;
          surname: string;
          age: number;
          active: boolean;
        };
        const rows = FdoGeneratorGenerateDelegate<Row>(
          [
            getStringColumn<Row>("name", 12, 4),
            getStringColumn<Row>("surname", 12, 4),
            new FdoColumnNumber<Row>("age", { max: 120 }),
            new FdoColumnBoolean("active"),
          ],
          20
        );
        expect(rows.length).toBe(20);
        rows.forEach((a) => {
          expect(typeof a.name).toBe("string");
          expect(typeof a.surname).toBe("string");
          expect(typeof a.age).toBe("number");
          expect(typeof a.active).toBe("boolean");
          expect(Object.keys(a)).toEqual(["name", "surname", "age", "active"]);
        });
      });
    });
  });
});
