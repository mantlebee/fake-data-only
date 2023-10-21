import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { ColumnOptions, Matrix, Row } from "./types";

export interface IColumn<
  TRow extends Row,
  TValue = Any,
  TOptions extends ColumnOptions = ColumnOptions
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

export interface IRelation<TSourceRow extends Row, TTargetRow extends Row> {
  readonly sourceColumnName: KeyOf<TSourceRow>;
  readonly sourceTable: ITable<TSourceRow>;
  readonly targetTable: ITable<TTargetRow>;
  setValues(matrix: Matrix): void;
}

export interface ITable<TRow extends Row> {
  readonly columns: List<IColumn<TRow>>;
  readonly name: string;
  getRows(count: number): List<TRow>;
}
