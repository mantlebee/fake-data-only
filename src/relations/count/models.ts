import { KeyOf, List } from "@mantlebee/ts-core";

import { ColumnRelation } from "@/models";
import { Row, TableKey } from "@/types";

import { RelationCountCondition } from "./types";
import { setRelationCountValues } from "./utils";

export class ColumnRelationCount<
  TRow extends Row,
  TTargetRow extends Row,
> extends ColumnRelation<TRow, TTargetRow, number> {
  public constructor(
    name: KeyOf<TRow>,
    targetTableKey: TableKey<TTargetRow>,
    protected readonly countCondition: RelationCountCondition<TRow, TTargetRow>
  ) {
    super(name, 0, targetTableKey);
  }

  public setValues(sourceRows: List<TRow>, targetRows: List<TTargetRow>): void {
    const { countCondition, name } = this;
    setRelationCountValues(name, countCondition, sourceRows, targetRows);
  }
}
