import { KeyOf } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";
import { FdoColumnOptions } from "@/types";

import { FdoColumnDependencyGetValueDelegate } from "./utils";
import { FdoColumnConstructor, FdoColumnOptionsValueGettersMap } from "./types";

export abstract class FdoColumnDependencyAbstract<
  TRow,
  TValue,
  TOptions extends FdoColumnOptions,
  TConstructor extends FdoColumnConstructor<TRow, TValue, TOptions>
> extends FdoColumn<TRow, TValue> {
  public abstract readonly columnConstructor: TConstructor;
  private readonly optionsValuesGetters!: FdoColumnOptionsValueGettersMap<
    TRow,
    TOptions
  >;

  public constructor(
    name: KeyOf<TRow>,
    optionsValuesGetters: FdoColumnOptionsValueGettersMap<TRow, TOptions>
  ) {
    super(name);
    this.optionsValuesGetters = optionsValuesGetters;
  }

  public getValue(row: TRow): TValue {
    return FdoColumnDependencyGetValueDelegate(
      row,
      this.columnConstructor,
      this.optionsValuesGetters
    );
  }
}

export class FdoColumnDependency<
  TRow,
  TValue,
  TOptions extends FdoColumnOptions,
  TConstructor extends FdoColumnConstructor<TRow, TValue, TOptions>
> extends FdoColumnDependencyAbstract<TRow, TValue, TOptions, TConstructor> {
  public readonly columnConstructor!: TConstructor;

  public constructor(
    name: KeyOf<TRow>,
    optionsValuesGetters: FdoColumnOptionsValueGettersMap<TRow, TOptions>,
    columnConstructor: TConstructor
  ) {
    super(name, optionsValuesGetters);
    this.columnConstructor = columnConstructor;
  }
}
