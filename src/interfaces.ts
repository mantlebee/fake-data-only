import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import {
  FdoColumnOptions,
  FdoMatrixResult,
  FdoMatrixTable,
  FdoTableOptions,
} from "./types";

export interface IFdoColumn<
  TRow,
  TValue,
  TOptions extends FdoColumnOptions = Any
> {
  readonly name: KeyOf<TRow>;
  readonly options: TOptions;
  getValue(row: TRow): TValue;
}

export interface IFdoMatrix<
  TTablesMap extends Dictionary<FdoMatrixTable<Any>>
> {
  readonly tablesMap: TTablesMap;
  getMatrix(): FdoMatrixResult<TTablesMap>;
}

export interface IFdoRelation<TSourceRow, TTargetRow> {
  readonly sourceColumnName: KeyOf<TSourceRow>;
  readonly sourceTable: IFdoTable<TSourceRow>;
  readonly tagetTable: IFdoTable<TTargetRow>;
  setValues<TTablesMap>(matrixResult: FdoMatrixResult<TTablesMap>): void;
}

export interface IFdoTable<TRow> {
  readonly columns: List<IFdoColumn<TRow, Any, Any>>;
  readonly options?: FdoTableOptions<TRow>;
  getRows(rowsNumber: number): List<TRow>;
}
