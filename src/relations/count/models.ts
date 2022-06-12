import { KeyOf } from "@mantlebee/ts-core";

import { IFdoTable } from "@/interfaces";
import { FdoRelation } from "@/models";
import { FdoMatrix } from "@/types";

import { FdoRelationCountCondition } from "./types";
import { FdoRelationCountSetValuesDelegate } from "./utils";

export class FdoRelationCount<TSourceRow, TTargetRow> extends FdoRelation<
  TSourceRow,
  TTargetRow
> {
  private readonly countConditionDelegate: FdoRelationCountCondition<
    TSourceRow,
    TTargetRow
  >;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: IFdoTable<TSourceRow>,
    targetTable: IFdoTable<TTargetRow>,
    countConditionDelegate: FdoRelationCountCondition<TSourceRow, TTargetRow>
  ) {
    super(sourceColumnName, sourceTable, targetTable);
    this.countConditionDelegate = countConditionDelegate;
  }

  public setValues(matrix: FdoMatrix): void {
    const {
      countConditionDelegate,
      sourceColumnName,
      sourceTable,
      targetTable,
    } = this;
    const sourceRows = this.getTableRows(sourceTable, matrix);
    const targetRows = this.getTableRows(targetTable, matrix);
    FdoRelationCountSetValuesDelegate(
      countConditionDelegate,
      sourceColumnName,
      sourceRows,
      targetRows
    );
  }
}
