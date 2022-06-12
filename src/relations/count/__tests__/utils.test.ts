import { FdoColumnEmail, FdoColumnId } from "@/columns";
import { FdoTable } from "@/models";
import { List } from "@mantlebee/ts-core";

import { FdoRelationCountCoundition } from "../types";
import { FdoRelationCountSetValuesDelegate } from "../utils";

describe("FdoRelationCount", () => {
  describe("utils", () => {
    describe("FdoRelationCountSetValueDelegate", () => {
      it("Correct count", () => {
        type Contact = { email: string; personId: number };
        type Person = { contactsCount: number; id: number };
        const contacts: List<Contact> = [
          { personId: 1, email: "x" },
          { personId: 1, email: "y" },
        ];
        const people: List<Person> = [
          { contactsCount: -1, id: 1 },
          { contactsCount: -1, id: 2 },
        ];
        const condition: FdoRelationCountCoundition<Person, Contact> = (s, t) =>
          t.personId === s.id;
        FdoRelationCountSetValuesDelegate(
          condition,
          "contactsCount",
          people,
          contacts
        );
        expect(people[0].contactsCount).toBe(2);
        expect(people[1].contactsCount).toBe(0);
      });
    });
  });
});
