import { KeyOf } from "@mantlebee/ts-core";

import { Column } from "@/models";
import { ColumnOptions } from "@/types";

import { ColumnDependencyGetValueDelegate } from "./utils";
import { ColumnConstructor, ColumnOptionsValueGettersMap } from "./types";

export abstract class ColumnDependencyAbstract<
  TRow,
  TValue,
  TOptions extends ColumnOptions,
  TConstructor extends ColumnConstructor<TRow, TValue, TOptions>
> extends Column<TRow, TValue> {
  public abstract readonly columnConstructor: TConstructor;
  private readonly optionsValuesGetters!: ColumnOptionsValueGettersMap<
    TRow,
    TOptions
  >;

  public constructor(
    name: KeyOf<TRow>,
    optionsValuesGetters: ColumnOptionsValueGettersMap<TRow, TOptions>
  ) {
    super(name);
    this.optionsValuesGetters = optionsValuesGetters;
  }

  public getValue(row: TRow): TValue {
    return ColumnDependencyGetValueDelegate(
      row,
      this.columnConstructor,
      this.optionsValuesGetters
    );
  }
}

export class ColumnDependency<
  TRow,
  TValue,
  TOptions extends ColumnOptions,
  TConstructor extends ColumnConstructor<TRow, TValue, TOptions>
> extends ColumnDependencyAbstract<TRow, TValue, TOptions, TConstructor> {
  public readonly columnConstructor!: TConstructor;

  public constructor(
    name: KeyOf<TRow>,
    optionsValuesGetters: ColumnOptionsValueGettersMap<TRow, TOptions>,
    columnConstructor: TConstructor
  ) {
    super(name, optionsValuesGetters);
    this.columnConstructor = columnConstructor;
  }
}
