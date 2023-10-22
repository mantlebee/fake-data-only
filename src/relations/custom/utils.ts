import { KeyOf, List } from "@mantlebee/ts-core";

import { Data, Row } from "@/types";

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
