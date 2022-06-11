import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { FdoColumnOptions, FdoTableOptions } from "./types";

export interface IFdoColumn<
  TRow,
  TValue,
  TOptions extends FdoColumnOptions = Any
> {
  readonly name: KeyOf<TRow>;
  readonly options: TOptions;
  value(item: TRow): TValue;
}

export interface IFdoTable<TRow> {
  readonly columns: List<IFdoColumn<TRow, Any, Any>>;
  readonly options?: FdoTableOptions<TRow>;
  generate(rowsNumber: number): List<TRow>;
}
