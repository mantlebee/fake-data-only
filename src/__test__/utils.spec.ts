import {
  isBoolean,
  isDate,
  isEmail,
  isNumber,
  isString,
  KeyOf,
  Nullable,
  objectHasKey,
} from "@mantlebee/ts-core";

import {
  FdoColumnBoolean,
  FdoColumnCustom,
  FdoColumnDate,
  FdoColumnEmail,
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
      it("Generates 20 rows of `{id: number, name: string, surname: string, fullname: string, age: number, email: string active: boolean, registered: Date}`", () => {
        type Row = {
          id: number;
          name: string;
          surname: string;
          fullname: string;
          age: number;
          email: string;
          active: boolean;
          registered: Date;
        };
        const rows = FdoGeneratorGenerateDelegate<Row>(
          [
            new FdoColumnId<Row>("id"),
            new FdoColumnFirstName<Row>("name"),
            new FdoColumnLastName<Row>("surname"),
            new FdoColumnCustom<Row, string>(
              "fullname",
              (a) => `${a.name} ${a.surname}`
            ),
            new FdoColumnNumber<Row>("age", { max: 120 }),
            new FdoColumnEmail<Row>("email"),
            new FdoColumnBoolean<Row>("active"),
            new FdoColumnDate<Row>("registered"),
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
          expect(isString(a.fullname)).toBeTruthy();
          expect(a.fullname).toBe(`${a.name} ${a.surname}`);
          expect(isNumber(a.age)).toBeTruthy();
          expect(isEmail(a.email)).toBeTruthy();
          expect(isBoolean(a.active)).toBeTruthy();
          expect(isDate(a.registered)).toBeTruthy();
          expect(Object.keys(a)).toEqual([
            "id",
            "name",
            "surname",
            "fullname",
            "age",
            "email",
            "active",
            "registered",
          ]);
          lastRow = a;
        });
      });
    });
  });
});
