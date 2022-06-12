import { KeyOf, List } from "@mantlebee/ts-core";

import { FdoMatrix } from "@/types";

import { FdoRelationCustomGetValueDelegate } from "./types";

export function FdoRelationCustomSetValuesDelegate<
  TSourceRow,
  TTargetRow,
  TValue
>(
  sourceColumnName: KeyOf<TSourceRow>,
  sourceRows: List<TSourceRow>,
  targetRows: List<TTargetRow>,
  matrix: FdoMatrix,
  getValueDelegate: FdoRelationCustomGetValueDelegate<
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
