import { KeyOf, List } from "@mantlebee/ts-core";

import { Data } from "@/types";

import { RelationCustomGetValueDelegate } from "./types";

export function RelationCustomSetValuesDelegate<
  TSourceRow,
  TTargetRow,
  TValue
>(
  sourceColumnName: KeyOf<TSourceRow>,
  sourceRows: List<TSourceRow>,
  targetRows: List<TTargetRow>,
  matrix: Data,
  getValueDelegate: RelationCustomGetValueDelegate<
    TSourceRow,
    TTargetRow,
    TValue
  >
): void {
  sourceRows.forEach((sourceRow) => {
    sourceRow[sourceColumnName] = (getValueDelegate(
      sourceRow,
      targetRows,
      matrix
    ) as unknown) as TSourceRow[KeyOf<TSourceRow>];
  });
}
