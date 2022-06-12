import { KeyOf } from "@mantlebee/ts-core";

import { IFdoTable } from "@/interfaces";
import { FdoRelation } from "@/models";
import { FdoMatrix } from "@/types";

import { FdoRelationValueSetValuesDelegate } from "./utils";

export class FdoRelationValue<TSourceRow, TTargetRow> extends FdoRelation<
  TSourceRow,
  TTargetRow
> {
  private readonly targetColumnName: KeyOf<TTargetRow>;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: IFdoTable<TSourceRow>,
    targetTable: IFdoTable<TTargetRow>,
    targetColumnName: KeyOf<TTargetRow>
  ) {
    super(sourceColumnName, sourceTable, targetTable);
    this.targetColumnName = targetColumnName;
  }

  public setValues(matrix: FdoMatrix): void {
    const {
      targetColumnName,
      sourceColumnName,
      sourceTable,
      targetTable,
    } = this;
    const sourceRows = this.getTableRows(sourceTable, matrix);
    const targetRows = this.getTableRows(targetTable, matrix);
    FdoRelationValueSetValuesDelegate(
      sourceColumnName,
      sourceRows,
      targetRows,
      targetColumnName
    );
  }
}
