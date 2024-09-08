import { KeyOf, List } from "@mantlebee/ts-core";

import { ColumnRelation } from "@/models";
import { ColumnOptionsGetter, Row, TableKey } from "@/types";

import {
  ColumnRelationDateFromOptions,
  ColumnRelationDateFromOptionsGetter,
  RelationDateFromCondition,
} from "./types";
import { setRelationDateFromValues } from "./utils";

export class ColumnRelationDateFrom<
  TRow extends Row,
  TTargetRow extends Row,
> extends ColumnRelation<
  TRow,
  TTargetRow,
  Date,
  ColumnRelationDateFromOptions
> {
  public constructor(
    name: KeyOf<TRow>,
    targetTableKey: TableKey<TTargetRow>,
    protected readonly targetColumnName: KeyOf<TTargetRow>,
    protected readonly findTargetRow: RelationDateFromCondition<
      TRow,
      TTargetRow
    >,
    getOptions?: ColumnRelationDateFromOptionsGetter<TRow, TTargetRow>
  ) {
    super(name, new Date(), targetTableKey, getOptions);
  }

  public setValues(sourceRows: List<TRow>, targetRows: List<TTargetRow>): void {
    const { findTargetRow, getOptions, name, targetColumnName } = this;
    setRelationDateFromValues(
      name,
      targetColumnName,
      findTargetRow,
      sourceRows,
      targetRows,
      getOptions
    );
  }
}
