import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { ColumnOptions, Matrix, TableOptions } from "./types";

export interface IColumn<
  TRow,
  TValue,
  TOptions extends ColumnOptions = Any
> {
  readonly name: KeyOf<TRow>;
  readonly options: TOptions;
  getValue(row: TRow): TValue;
}

export interface IGenerator<> {
  readonly relations?: List<IRelation<Any, Any>>;
  readonly tables: List<ITable<Any>>;
  getMatrix(rowsNumberMap: Dictionary<number>): Matrix;
}

export interface IRelation<TSourceRow, TTargetRow> {
  readonly sourceColumnName: KeyOf<TSourceRow>;
  readonly sourceTable: ITable<TSourceRow>;
  readonly targetTable: ITable<TTargetRow>;
  setValues(matrix: Matrix): void;
}

export interface ITable<TRow> {
  readonly columns: List<IColumn<TRow, Any, Any>>;
  readonly name: string;
  readonly options?: TableOptions<TRow>;
  getRows(rowsNumber: number): List<TRow>;
}
