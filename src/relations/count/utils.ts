import { KeyOf, List } from "@mantlebee/ts-core";

import { FdoRelationCountCondition } from "./types";

export function FdoRelationCountSetValuesDelegate<TSourceRow, TTargetRow>(
  countConditionDelegate: FdoRelationCountCondition<TSourceRow, TTargetRow>,
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
