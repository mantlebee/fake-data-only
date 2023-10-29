import { List } from "@mantlebee/ts-core";

import { setRelationLookupValues } from "../utils";

describe("RelationLookup", () => {
  describe("utils", () => {
    describe("setRelationLookupValues", () => {
      it("Correct count", () => {
        type Detail = { personId: number };
        type Master = { id: number };
        const detailRows: List<Detail> = [
          { personId: -1 },
          { personId: -1 },
          { personId: -1 },
          { personId: -1 },
          { personId: -1 },
        ];
        const masterRows: List<Master> = [{ id: 1 }, { id: 2 }, { id: 3 }];
        setRelationLookupValues<Detail, Master>(
          "personId",
          "id",
          detailRows,
          masterRows
        );
        detailRows.forEach((a) => {
          expect(a.personId).toBeGreaterThanOrEqual(1);
          expect(a.personId).toBeLessThanOrEqual(3);
        });
      });
    });
  });
});
