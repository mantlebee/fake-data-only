import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { IFdoColumn, IFdoTable } from "./interfaces";
import { FdoColumnOptions, FdoTableOptions } from "./types";
import { FdoTableGenerateDelegate } from "./utils";

export abstract class FdoColumn<
  TRow,
  TValue,
  TOptions extends FdoColumnOptions = Any
> implements IFdoColumn<TRow, TValue, TOptions> {
  public readonly name!: KeyOf<TRow>;
  public readonly options!: TOptions;

  public constructor(name: KeyOf<TRow>, options?: TOptions) {
    this.name = name;
    if (options) this.options = options;
  }

  public abstract value(item: TRow): TValue;
}

export class FdoTable<TRow> implements IFdoTable<TRow> {
  public readonly columns: List<IFdoColumn<TRow, Any, any>>;
  public readonly options?: FdoTableOptions<TRow>;

  public constructor(
    columns: List<IFdoColumn<TRow, Any, any>>,
    options?: FdoTableOptions<TRow>
  ) {
    this.columns = columns;
    this.options = options;
  }

  public generate(rowsNumber: number): List<TRow> {
    const { columns, options } = this;
    return FdoTableGenerateDelegate(columns, rowsNumber, options);
  }
}
