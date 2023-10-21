import { KeyOf, List } from "@mantlebee/ts-core";

import { RelationCountCondition } from "./types";

export function RelationCountSetValuesDelegate<TSourceRow, TTargetRow>(
  countConditionDelegate: RelationCountCondition<TSourceRow, TTargetRow>,
  sourceColumnName: KeyOf<TSourceRow>,
  sourceRows: List<TSourceRow>,
  targetRows: List<TTargetRow>
): void {
  sourceRows.forEach((sourceRow) => {
    const count = targetRows.filter((targetRow) =>
      countConditionDelegate(sourceRow, targetRow)
    ).length;
    sourceRow[sourceColumnName] = (count as unknown) as TSourceRow[KeyOf<
      TSourceRow
    >];
  });
}
