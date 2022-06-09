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
  FdoColumnColor,
  FdoColumnCustom,
  FdoColumnDate,
  FdoColumnDateDependency,
  FdoColumnEmail,
  FdoColumnEnum,
  FdoColumnFirstName,
  FdoColumnId,
  FdoColumnLastName,
  FdoColumnNumber,
  FdoColumnNumberDependency,
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
    includeLowercase: true,
    includeNumbers: false,
    includeUppercase: false,
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
      it("Generates 100 rows of `{id: number, name: string, surname: string, fullname: string, age: Nullable<number>, email: string active: boolean, registered: Date, expires: Date, type: RowType, color: string, scoreMax: number; score: number}`", () => {
        enum RowType {
          base,
          standard,
          advanced,
        }
        type Row = {
          id: number;
          name: string;
          surname: string;
          fullname: string;
          age: Nullable<number>;
          email: string;
          active: boolean;
          registered: Date;
          expires: Date;
          type: RowType;
          color: string;
          scoreMax: number;
          score: number;
        };
        const firstNameColumn = new FdoColumnFirstName<Row>("name");
        const lastNameColumn = new FdoColumnLastName<Row>("surname");
        const rows = FdoGeneratorGenerateDelegate<Row>(
          [
            new FdoColumnId<Row>("id"),
            firstNameColumn,
            lastNameColumn,
            new FdoColumnCustom<Row, string>(
              "fullname",
              (a) => `${a.name} ${a.surname}`
            ),
            new FdoColumnNumber<Row>("age", { max: 90 }),
            new FdoColumnEmail<Row>("email", {
              dependencies: {
                firstName: firstNameColumn,
                lastName: lastNameColumn,
              },
            }),
            new FdoColumnBoolean<Row>("active"),
            new FdoColumnDate<Row>("registered"),
            new FdoColumnDateDependency<Row>("expires", {
              dateFrom: (a) => a.registered,
            }),
            new FdoColumnEnum<Row, RowType>("type", Object(RowType)),
            new FdoColumnColor<Row>("color"),
            new FdoColumnNumber<Row>("scoreMax", { max: 100 }),
            new FdoColumnNumberDependency<Row>("score", {
              max: (a) => a.scoreMax,
            }),
          ],
          100,
          { nullables: ["age"] }
        );
        expect(rows.length).toBe(100);
        let lastRow: Nullable<Row> = null;
        rows.forEach((a) => {
          if (lastRow) expect(a.id).toBe(lastRow.id + 1);
          expect(isNumber(a.id)).toBeTruthy();
          expect(isString(a.name)).toBeTruthy();
          expect(isString(a.surname)).toBeTruthy();
          expect(isString(a.fullname)).toBeTruthy();
          expect(a.fullname).toBe(`${a.name} ${a.surname}`);
          expect(isEmail(a.email)).toBeTruthy();
          expect(
            a.email.indexOf(
              `${a.name.toLowercase()}.${a.surname.toLowercase()}`
            )
          ).toBe(0);
          expect(isBoolean(a.active)).toBeTruthy();
          expect(isDate(a.registered)).toBeTruthy();
          expect(isDate(a.expires)).toBeTruthy();
          expect(a.expires.getTime()).toBeGreaterThanOrEqual(
            a.registered.getTime()
          );
          expect(a.type in RowType).toBeTruthy();
          expect(
            /^rgb\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\)$$/.test(a.color)
          ).toBeTruthy();
          expect(isNumber(a.scoreMax)).toBeTruthy();
          expect(isNumber(a.score)).toBeTruthy();
          expect(a.score).toBeLessThanOrEqual(a.scoreMax);
          expect(Object.keys(a)).toEqual([
            "id",
            "name",
            "surname",
            "fullname",
            "age",
            "email",
            "active",
            "registered",
            "expires",
            "type",
            "color",
            "scoreMax",
            "score",
          ]);
          lastRow = a;
        });
        expect(rows.some((a) => isNumber(a.age))).toBeTruthy();
        expect(rows.some((a) => a.age === null)).toBeTruthy();
      });
    });
  });
});
