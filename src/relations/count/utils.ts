import { KeyOf, List } from "@mantlebee/ts-core";

import { Row } from "@/types";

import { RelationCountCondition } from "./types";

export function setRelationCountValues<
  TSourceRow extends Row,
  TTargetRow extends Row,
>(
  sourceColumnName: KeyOf<TSourceRow>,
  countCondition: RelationCountCondition<TSourceRow, TTargetRow>,
  sourceRows: List<TSourceRow>,
  targetRows: List<TTargetRow>
): void {
  sourceRows.forEach((sourceRow) => {
    const count = targetRows.filter((targetRow) =>
      countCondition(sourceRow, targetRow)
    ).length;
    sourceRow[sourceColumnName] = count as TSourceRow[KeyOf<TSourceRow>];
  });
}
