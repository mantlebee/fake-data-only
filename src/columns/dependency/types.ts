import { KeyOf, KeysOf } from "@mantlebee/ts-core";

import { IColumn } from "@/interfaces";
import { ColumnOptions, Row } from "@/types";

export type ColumnConstructor<
  TRow extends Row,
  TValue,
  TOptions extends ColumnOptions,
> = new (name: string, options?: TOptions) => IColumn<TRow, TValue, TOptions>;
export type ColumnOptionsValueGettersMap<
  TRow extends Row,
  TOptions extends ColumnOptions,
> = KeysOf<TOptions, (row: TRow) => TOptions[KeyOf<TOptions>]>;
