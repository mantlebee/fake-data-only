import { List } from "@mantlebee/ts-core";

import { RelationCustomGetValueDelegate } from "../types";
import { RelationCustomSetValuesDelegate } from "../utils";

describe("RelationCustom", () => {
  describe("utils", () => {
    describe("RelationCustomSetValueDelegate", () => {
      it("Set the value resulting from the delegate", () => {
        type To = { email: string };
        type From = { emailsWithCCount: number };
        const contacts: List<To> = [
          { email: "x.y@z" },
          { email: "a.b@c" },
          { email: "d.j@u" },
          { email: "f.k@x" },
        ];
        const people: List<From> = [
          { emailsWithCCount: -1 },
          { emailsWithCCount: -1 },
        ];
        const delegate: RelationCustomGetValueDelegate<From, To, number> = (
          s,
          t
        ) => t.filter((a) => /x/.test(a.email)).length;
        RelationCustomSetValuesDelegate<From, To, number>(
          "emailsWithCCount",
          people,
          contacts,
          [],
          delegate
        );
        people.forEach((a) => {
          expect(a.emailsWithCCount).toBe(2);
        });
      });
    });
  });
});
