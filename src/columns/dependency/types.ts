import { KeyOf, KeysOf } from "@mantlebee/ts-core";

import { IColumn } from "@/interfaces";
import { ColumnOptions } from "@/types";

export type ColumnConstructor<
  TRow,
  TValue,
  TOptions extends ColumnOptions,
> = new (name: string, options?: TOptions) => IColumn<TRow, TValue, TOptions>;
export type ColumnOptionsValueGettersMap<
  TRow,
  TOptions extends ColumnOptions,
> = KeysOf<TOptions, (row: TRow) => TOptions[KeyOf<TOptions>]>;
