import { KeyOf, List } from "@mantlebee/ts-core";

import { Dataset, Row } from "@/types";

import { ColumnRelationCustomValueGetter } from "./types";

export function setColumnRelationCustomValues<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TValue,
>(
  sourceColumnName: KeyOf<TSourceRow>,
  getValueDelegate: ColumnRelationCustomValueGetter<
    TSourceRow,
    TTargetRow,
    TValue
  >,
  sourceRows: List<TSourceRow>,
  targetRows: List<TTargetRow>,
  dataset: Dataset
): void {
  sourceRows.forEach((sourceRow) => {
    sourceRow[sourceColumnName] = getValueDelegate(
      sourceRow,
      targetRows,
      dataset
    ) as unknown as TSourceRow[KeyOf<TSourceRow>];
  });
}
