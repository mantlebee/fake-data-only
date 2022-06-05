import {
  isBoolean,
  isDate,
  isNumber,
  isString,
  KeyOf,
  Nullable,
  objectHasKey,
} from "@mantlebee/ts-core";

import {
  FdoColumnBoolean,
  FdoColumnDate,
  FdoColumnFirstName,
  FdoColumnId,
  FdoColumnLastName,
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
      it("Generates 20 rows of {id: number, name: string, surname: string, age: number, active: boolean, registered: Date}", () => {
        type Row = {
          id: number;
          name: string;
          surname: string;
          age: number;
          active: boolean;
          registered: Date;
        };
        const rows = FdoGeneratorGenerateDelegate<Row>(
          [
            new FdoColumnId("id"),
            new FdoColumnFirstName("name"),
            new FdoColumnLastName("surname"),
            new FdoColumnNumber<Row>("age", { max: 120 }),
            new FdoColumnBoolean("active"),
            new FdoColumnDate("registered"),
          ],
          20
        );
        expect(rows.length).toBe(20);
        let lastRow: Nullable<Row> = null;
        rows.forEach((a) => {
          if (lastRow) expect(a.id).toBe(lastRow.id + 1);
          expect(isNumber(a.id)).toBeTruthy();
          expect(isString(a.name)).toBeTruthy();
          expect(isString(a.surname)).toBeTruthy();
          expect(isNumber(a.age)).toBeTruthy();
          expect(isBoolean(a.active)).toBeTruthy();
          expect(isDate(a.registered)).toBeTruthy();
          expect(Object.keys(a)).toEqual([
            "id",
            "name",
            "surname",
            "age",
            "active",
            "registered",
          ]);
          lastRow = a;
        });
      });
    });
  });
});
