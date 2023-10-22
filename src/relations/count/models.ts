import { KeyOf } from "@mantlebee/ts-core";

import { ITable } from "@/interfaces";
import { Relation } from "@/models";
import { Data } from "@/types";

import { RelationCountCondition } from "./types";
import { RelationCountSetValuesDelegate } from "./utils";

export class RelationCount<TSourceRow, TTargetRow> extends Relation<
  TSourceRow,
  TTargetRow
> {
  private readonly countConditionDelegate: RelationCountCondition<
    TSourceRow,
    TTargetRow
  >;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: ITable<TSourceRow>,
    targetTable: ITable<TTargetRow>,
    countConditionDelegate: RelationCountCondition<TSourceRow, TTargetRow>
  ) {
    super(sourceColumnName, sourceTable, targetTable);
    this.countConditionDelegate = countConditionDelegate;
  }

  public setValues(matrix: Data): void {
    const {
      countConditionDelegate,
      sourceColumn: sourceColumnName,
      sourceTable,
      targetTable,
    } = this;
    const sourceRows = this.getTableRows(sourceTable, matrix);
    const targetRows = this.getTableRows(targetTable, matrix);
    RelationCountSetValuesDelegate(
      countConditionDelegate,
      sourceColumnName,
      sourceRows,
      targetRows
    );
  }
}
