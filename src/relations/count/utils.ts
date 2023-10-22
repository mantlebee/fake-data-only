import { KeyOf, List } from "@mantlebee/ts-core";

import { Row } from "@/types";

import { ColumnRelationCountCondition } from "./types";

export function ColumnRelationCountDelegate<
  TSourceRow extends Row,
  TTargetRow extends Row,
>(
  sourceColumnName: KeyOf<TSourceRow>,
  countConditionDelegate: ColumnRelationCountCondition<TSourceRow, TTargetRow>,
  sourceRows: List<TSourceRow>,
  targetRows: List<TTargetRow>,
): void {
  sourceRows.forEach((sourceRow) => {
    const count = targetRows.filter((targetRow) =>
      countConditionDelegate(sourceRow, targetRow),
    ).length;
    sourceRow[sourceColumnName] = count as TSourceRow[KeyOf<TSourceRow>];
  });
}
