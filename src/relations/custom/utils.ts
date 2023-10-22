import { KeyOf, List } from "@mantlebee/ts-core";

import { Data, Row } from "@/types";

import { ColumnRelationCustomGetValueDelegate } from "./types";

export function ColumnRelationCustomDelegate<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TValue,
>(
  sourceColumnName: KeyOf<TSourceRow>,
  getValueDelegate: ColumnRelationCustomGetValueDelegate<
    TSourceRow,
    TTargetRow,
    TValue
  >,
  sourceRows: List<TSourceRow>,
  targetRows: List<TTargetRow>,
  data: Data,
): void {
  sourceRows.forEach((sourceRow) => {
    sourceRow[sourceColumnName] = getValueDelegate(
      sourceRow,
      targetRows,
      data,
    ) as unknown as TSourceRow[KeyOf<TSourceRow>];
  });
}
