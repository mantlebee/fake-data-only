import { Any, Dictionary, KeyOf, KeysOf, List } from "@mantlebee/ts-core";

import { FdoColumnOptions, FdoMatrixTable, FdoTableOptions } from "./types";

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
  getMatrix(): KeysOf<TTablesMap, List<Any>>;
}

export interface IFdoTable<TRow> {
  readonly columns: List<IFdoColumn<TRow, Any, Any>>;
  readonly options?: FdoTableOptions<TRow>;
  getRows(rowsNumber: number): List<TRow>;
}
