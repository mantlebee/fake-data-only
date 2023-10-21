import { KeyOf } from "@mantlebee/ts-core";

import { ITable } from "@/interfaces";
import { Relation } from "@/models";
import { Matrix } from "@/types";

import { RelationCustomGetValueDelegate } from "./types";
import { RelationCustomSetValuesDelegate } from "./utils";

export class RelationCustom<
  TSourceRow,
  TTargetRow,
  TValue
> extends Relation<TSourceRow, TTargetRow> {
  private readonly getValueDelegate: RelationCustomGetValueDelegate<
    TSourceRow,
    TTargetRow,
    TValue
  >;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: ITable<TSourceRow>,
    targetTable: ITable<TTargetRow>,
    getValueDelegate: RelationCustomGetValueDelegate<
      TSourceRow,
      TTargetRow,
      TValue
    >
  ) {
    super(sourceColumnName, sourceTable, targetTable);
    this.getValueDelegate = getValueDelegate;
  }

  public setValues(matrix: Matrix): void {
    const {
      getValueDelegate,
      sourceColumnName,
      sourceTable,
      targetTable,
    } = this;
    const sourceRows = this.getTableRows(sourceTable, matrix);
    const targetRows = this.getTableRows(targetTable, matrix);
    RelationCustomSetValuesDelegate(
      sourceColumnName,
      sourceRows,
      targetRows,
      matrix,
      getValueDelegate
    );
  }
}
