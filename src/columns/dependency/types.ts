import { KeyOf, KeysOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";
import { FdoColumnOptions } from "@/types";

export type FdoColumnConstructor<
  TRow,
  TValue,
  TOptions extends FdoColumnOptions
> = new (name: string, options?: TOptions) => IFdoColumn<
  TRow,
  TValue,
  TOptions
>;
export type FdoColumnOptionsValueGettersMap<
  TRow,
  TOptions extends FdoColumnOptions
> = KeysOf<TOptions, (row: TRow) => TOptions[KeyOf<TOptions>]>;
