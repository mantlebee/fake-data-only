import { KeyOf } from "@mantlebee/ts-core";

import { ITable } from "@/interfaces";
import { Relation } from "@/models";
import { Matrix } from "@/types";

import { RelationValueSetValuesDelegate } from "./utils";

export class RelationValue<TSourceRow, TTargetRow> extends Relation<
  TSourceRow,
  TTargetRow
> {
  private readonly targetColumnName: KeyOf<TTargetRow>;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: ITable<TSourceRow>,
    targetTable: ITable<TTargetRow>,
    targetColumnName: KeyOf<TTargetRow>
  ) {
    super(sourceColumnName, sourceTable, targetTable);
    this.targetColumnName = targetColumnName;
  }

  public setValues(matrix: Matrix): void {
    const {
      targetColumnName,
      sourceColumnName,
      sourceTable,
      targetTable,
    } = this;
    const sourceRows = this.getTableRows(sourceTable, matrix);
    const targetRows = this.getTableRows(targetTable, matrix);
    RelationValueSetValuesDelegate(
      sourceColumnName,
      sourceRows,
      targetRows,
      targetColumnName
    );
  }
}
