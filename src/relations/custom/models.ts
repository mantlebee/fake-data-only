import { KeyOf } from "@mantlebee/ts-core";

import { IFdoTable } from "@/interfaces";
import { FdoRelation } from "@/models";
import { FdoMatrix } from "@/types";

import { FdoRelationCustomGetValueDelegate } from "./types";
import { FdoRelationCustomSetValuesDelegate } from "./utils";

export class FdoRelationCustom<
  TSourceRow,
  TTargetRow,
  TValue
> extends FdoRelation<TSourceRow, TTargetRow> {
  private readonly getValueDelegate: FdoRelationCustomGetValueDelegate<
    TSourceRow,
    TTargetRow,
    TValue
  >;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: IFdoTable<TSourceRow>,
    targetTable: IFdoTable<TTargetRow>,
    getValueDelegate: FdoRelationCustomGetValueDelegate<
      TSourceRow,
      TTargetRow,
      TValue
    >
  ) {
    super(sourceColumnName, sourceTable, targetTable);
    this.getValueDelegate = getValueDelegate;
  }

  public setValues(matrix: FdoMatrix): void {
    const {
      getValueDelegate,
      sourceColumnName,
      sourceTable,
      targetTable,
    } = this;
    const sourceRows = this.getTableRows(sourceTable, matrix);
    const targetRows = this.getTableRows(targetTable, matrix);
    FdoRelationCustomSetValuesDelegate(
      sourceColumnName,
      sourceRows,
      targetRows,
      matrix,
      getValueDelegate
    );
  }
}
