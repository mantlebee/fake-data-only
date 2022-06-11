import { Any, Dictionary, KeyOf, KeysOf, List } from "@mantlebee/ts-core";

import { IFdoColumn, IFdoMatrix, IFdoTable } from "./interfaces";
import { FdoColumnOptions, FdoMatrixTable, FdoTableOptions } from "./types";
import { FdoMatrixGenerateDelegate, FdoTableGenerateDelegate } from "./utils";

export abstract class FdoColumn<
  TRow,
  TValue,
  TOptions extends FdoColumnOptions = Any
> implements IFdoColumn<TRow, TValue, TOptions> {
  public readonly name: KeyOf<TRow>;
  public readonly options!: TOptions;

  public constructor(name: KeyOf<TRow>, options?: TOptions) {
    this.name = name;
    if (options) this.options = options;
  }

  public abstract value(item: TRow): TValue;
}

export class FdoMatrix<TTablesMap extends Dictionary<FdoMatrixTable<Any>>>
  implements IFdoMatrix<TTablesMap> {
  public readonly tablesMap: TTablesMap;

  public constructor(tablesMap: TTablesMap) {
    this.tablesMap = tablesMap;
  }

  public generate(): KeysOf<TTablesMap, List<any>> {
    const { tablesMap } = this;
    return FdoMatrixGenerateDelegate(tablesMap);
  }
}

export class FdoTable<TRow> implements IFdoTable<TRow> {
  public readonly columns: List<IFdoColumn<TRow, Any, Any>>;
  public readonly options?: FdoTableOptions<TRow>;

  public constructor(
    columns: List<IFdoColumn<TRow, Any, Any>>,
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
