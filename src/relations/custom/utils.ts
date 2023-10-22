import { KeyOf, List } from "@mantlebee/ts-core";

import { Dataset, Row } from "@/types";

import { columnRelationCustomGetValueDelegate } from "./types";

export function columnRelationCustomSetValuesDelegate<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TValue,
>(
  sourceColumnName: KeyOf<TSourceRow>,
  getValueDelegate: columnRelationCustomGetValueDelegate<
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
