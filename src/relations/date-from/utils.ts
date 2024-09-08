import { KeyOf, List } from "@mantlebee/ts-core";

import { ColumnOptionsGetter, Row } from "@/types";

import {
  ColumnRelationDateFromOptions,
  RelationDateFromCondition,
} from "./types";
import { ColumnDateOptions, getColumnDateValue } from "@/columns";

export function setRelationDateFromValues<
  TSourceRow extends Row,
  TTargetRow extends Row,
>(
  sourceColumnName: KeyOf<TSourceRow>,
  targetColumnName: KeyOf<TTargetRow>,
  findTargetRow: RelationDateFromCondition<TSourceRow, TTargetRow>,
  sourceRows: List<TSourceRow>,
  targetRows: List<TTargetRow>,
  getOptions?: ColumnOptionsGetter<TSourceRow, ColumnRelationDateFromOptions>
): void {
  sourceRows.forEach((sourceRow) => {
    const targetRow = targetRows.find((a) => findTargetRow(sourceRow, a));
    if (targetRow) {
      const from = targetRow[targetColumnName] as Date;
      const dateOptions: ColumnDateOptions = {
        from,
        to: getOptions && getOptions(sourceRow, targetRow).to,
      };
      sourceRow[sourceColumnName] = getColumnDateValue(
        dateOptions
      ) as TSourceRow[KeyOf<TSourceRow>];
    }
  });
}
