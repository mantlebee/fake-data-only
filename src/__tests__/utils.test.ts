import {
  Any,
  Dictionary,
  isBoolean,
  isDate,
  isEmail,
  isNumber,
  isString,
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
  FdoColumnEmailDependency,
  FdoColumnEnum,
  FdoColumnFirstName,
  FdoColumnId,
  FdoColumnLastName,
  FdoColumnNumber,
  FdoColumnNumberDependency,
  FdoColumnString,
} from "@/columns";
import { FdoTableGetRowsDelegate } from "@/utils";

import { FdoTable } from "../models";
import { FdoMatrixTable } from "../types";
import { FdoMatrixGetMatrixDelegate } from "../utils";

describe("FdoTable", () => {
  describe("utils", () => {
    describe("FdoMatrixGeneratorDelegate", () => {
      it("Generates a map of lists, the map as the same keys of the given tablesMap param.", () => {
        type Address = { city: string; street: string };
        type Contact = { phone: string; email: string };
        type Person = { name: string; surname: string };
        const AddressTable = new FdoTable<Address>([
          new FdoColumnString("city", { maxLength: 20 }),
          new FdoColumnString("street", { maxLength: 20 }),
        ]);
        const ContactTable = new FdoTable<Contact>([
          new FdoColumnString("phone", {
            includeLowercase: false,
            includeNumbers: true,
            maxLength: 10,
            minLength: 10,
          }),
          new FdoColumnEmail("email"),
        ]);
        const PersonTable = new FdoTable<Person>([
          new FdoColumnFirstName("name"),
          new FdoColumnLastName("surname"),
        ]);
        const tablesMap: Dictionary<FdoMatrixTable<Any>> = {
          addresses: { rowsNumber: 10, table: AddressTable },
          contacts: { rowsNumber: 25, table: ContactTable },
          people: { rowsNumber: 20, table: PersonTable },
        };
        const matrix = FdoMatrixGetMatrixDelegate(tablesMap);
        expect(Object.keys(matrix)).toEqual([
          "addresses",
          "contacts",
          "people",
        ]);
        expect(matrix.addresses.length).toBe(tablesMap.addresses.rowsNumber);
        expect(matrix.contacts.length).toBe(tablesMap.contacts.rowsNumber);
        expect(matrix.people.length).toBe(tablesMap.people.rowsNumber);
      });
    });
    describe("FdoTableGetRowsDelegate", () => {
      it("Generates 5 rows of {name: string}", () => {
        type Row = { name: string };
        const rows = FdoTableGetRowsDelegate<Row>(
          [
            new FdoColumnString<Row>("name", {
              includeLowercase: true,
              maxLength: 12,
              minLength: 4,
            }),
          ],
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
        const rows = FdoTableGetRowsDelegate<Row>(
          [
            new FdoColumnId<Row>("id"),
            new FdoColumnFirstName<Row>("name"),
            new FdoColumnLastName<Row>("surname"),
            new FdoColumnCustom<Row, string>(
              "fullname",
              (a) => `${a.name} ${a.surname}`
            ),
            new FdoColumnNumber<Row>("age", { max: 90 }),
            new FdoColumnEmailDependency<Row>("email", {
              firstNames: (a) => [a.name],
              lastNames: (a) => [a.surname],
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
              `${a.name.toLowerCase()}.${a.surname.toLowerCase()}`
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
            /^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},[0-9]\)$$/.test(a.color)
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
