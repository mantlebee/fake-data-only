import { KeyOf, List } from "@mantlebee/ts-core";

import { Relation } from "@/models";
import { Row, TableKey } from "@/types";

import { RelationCountCondition } from "./types";
import { setRelationCountValues } from "./utils";

export class RelationCount<
  TSourceRow extends Row,
  TTargetRow extends Row,
> extends Relation<TSourceRow, TTargetRow> {
  private readonly countCondition: RelationCountCondition<
    TSourceRow,
    TTargetRow
  >;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTableKey: TableKey<TSourceRow>,
    targetTableKey: TableKey<TTargetRow>,
    countCondition: RelationCountCondition<TSourceRow, TTargetRow>
  ) {
    super(sourceColumnName, sourceTableKey, targetTableKey);
    this.countCondition = countCondition;
  }

  public setValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>
  ): void {
    const { countCondition, sourceColumnName } = this;
    setRelationCountValues(
      sourceColumnName,
      countCondition,
      sourceRows,
      targetRows
    );
  }
}
