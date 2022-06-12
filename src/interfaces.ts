import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { FdoColumnOptions, FdoMatrix, FdoTableOptions } from "./types";

export interface IFdoColumn<
  TRow,
  TValue,
  TOptions extends FdoColumnOptions = Any
> {
  readonly name: KeyOf<TRow>;
  readonly options: TOptions;
  getValue(row: TRow): TValue;
}

export interface IFdoGenerator<> {
  readonly tables: List<IFdoTable<Any>>;
  getMatrix(rowsNumberMap: Dictionary<number>): FdoMatrix;
}

export interface IFdoRelation<TSourceRow, TTargetRow> {
  readonly sourceColumnName: KeyOf<TSourceRow>;
  readonly sourceTable: IFdoTable<TSourceRow>;
  readonly targetTable: IFdoTable<TTargetRow>;
  setValues(matrix: FdoMatrix): void;
}

export interface IFdoTable<TRow> {
  readonly columns: List<IFdoColumn<TRow, Any, Any>>;
  readonly name: string;
  readonly options?: FdoTableOptions<TRow>;
  getRows(rowsNumber: number): List<TRow>;
}
