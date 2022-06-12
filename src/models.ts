import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { IFdoColumn, IFdoMatrix, IFdoRelation, IFdoTable } from "./interfaces";
import {
  FdoColumnOptions,
  FdoMatrixResult,
  FdoMatrixTable,
  FdoTableOptions,
} from "./types";
import { FdoMatrixGetMatrixDelegate, FdoTableGetRowsDelegate } from "./utils";

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

  public abstract getValue(row: TRow): TValue;
}

export class FdoMatrix<TTablesMap extends Dictionary<FdoMatrixTable<Any>>>
  implements IFdoMatrix<TTablesMap> {
  public readonly tablesMap: TTablesMap;

  public constructor(tablesMap: TTablesMap) {
    this.tablesMap = tablesMap;
  }

  public getMatrix(): FdoMatrixResult<TTablesMap> {
    const { tablesMap } = this;
    return FdoMatrixGetMatrixDelegate(tablesMap);
  }
}

export abstract class FdoRelation<TSourceRow, TTargetRow>
  implements IFdoRelation<TSourceRow, TTargetRow> {
  public readonly sourceColumnName: KeyOf<TSourceRow>;
  public readonly sourceTable: IFdoTable<TSourceRow>;
  public readonly tagetTable: IFdoTable<TTargetRow>;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: IFdoTable<TSourceRow>,
    tagetTable: IFdoTable<TTargetRow>
  ) {
    this.sourceColumnName = sourceColumnName;
    this.sourceTable = sourceTable;
    this.tagetTable = tagetTable;
  }

  // protected getTableRows<TRow, TTablesMap>(table: IFdoTable<TRow>, matrixResult: FdoMatrixResult<TTablesMap>): List<TRow> {
  // }

  public abstract setValues<TTablesMap>(
    matrixResult: FdoMatrixResult<TTablesMap>
  ): void;
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

  public getRows(rowsNumber: number): List<TRow> {
    const { columns, options } = this;
    return FdoTableGetRowsDelegate(columns, rowsNumber, options);
  }
}
