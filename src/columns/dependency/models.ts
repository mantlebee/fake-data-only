import { KeyOf } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";
import { FdoColumnOptions } from "@/types";

import { FdoColumnDependencyValueDelegate } from "./utils";
import { FdoColumnConstructor, FdoColumnOptionsValueGettersMap } from "./types";

export abstract class FdoColumnDependencyAbstract<
  TItem,
  TValue,
  TOptions extends FdoColumnOptions,
  TConstructor extends FdoColumnConstructor<TItem, TValue, TOptions>
> extends FdoColumn<TItem, TValue> {
  public abstract readonly columnConstructor: TConstructor;
  private readonly optionsValuesGetters!: FdoColumnOptionsValueGettersMap<
    TItem,
    TOptions
  >;

  public constructor(
    name: KeyOf<TItem>,
    optionsValuesGetters: FdoColumnOptionsValueGettersMap<TItem, TOptions>
  ) {
    super(name);
    this.optionsValuesGetters = optionsValuesGetters;
  }

  public value(item: TItem): TValue {
    return FdoColumnDependencyValueDelegate(
      item,
      this.columnConstructor,
      this.optionsValuesGetters
    );
  }
}

export class FdoColumnDependency<
  TItem,
  TValue,
  TOptions extends FdoColumnOptions,
  TConstructor extends FdoColumnConstructor<TItem, TValue, TOptions>
> extends FdoColumnDependencyAbstract<TItem, TValue, TOptions, TConstructor> {
  public readonly columnConstructor!: TConstructor;

  public constructor(
    name: KeyOf<TItem>,
    optionsValuesGetters: FdoColumnOptionsValueGettersMap<TItem, TOptions>,
    columnConstructor: TConstructor
  ) {
    super(name, optionsValuesGetters);
    this.columnConstructor = columnConstructor;
  }
}
