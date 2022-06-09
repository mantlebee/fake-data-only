import { KeyOf, KeysOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";
import { FdoColumnOptions } from "@/types";

export type FdoColumnConstructor<
  TItem,
  TValue,
  TOptions extends FdoColumnOptions
> = new (name: string, options?: TOptions) => IFdoColumn<
  TItem,
  TValue,
  TOptions
>;
export type FdoColumnOptionsValueGettersMap<
  TItem,
  TOptions extends FdoColumnOptions
> = KeysOf<TOptions, (item: TItem) => TOptions[KeyOf<TOptions>]>;
