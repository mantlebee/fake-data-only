import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import {
  IFdoColumn,
  IFdoGenerator,
  IFdoRelation,
  IFdoTable,
} from "./interfaces";
import { FdoColumnOptions, FdoMatrix, FdoTableOptions } from "./types";
import {
  FdoGeneratorGetMatrixDelegate,
  FdoTableGetRowsDelegate,
} from "./utils";

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

export class FdoGenerator implements IFdoGenerator {
  public readonly tables: List<IFdoTable<Any>>;

  public constructor(tables: List<IFdoTable<Any>>) {
    this.tables = tables;
  }

  public getMatrix(rowsNumberMap: Dictionary<number>): FdoMatrix {
    const { tables } = this;
    return FdoGeneratorGetMatrixDelegate(tables, rowsNumberMap);
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

  // protected getTableRows<TRow, TTablesMap>(table: IFdoTable<TRow>, matrixResult: FdoMatrix): List<TRow> {
  // }

  public abstract setValues(matrix: FdoMatrix): void;
}

export class FdoTable<TRow> implements IFdoTable<TRow> {
  public readonly columns: List<IFdoColumn<TRow, Any, Any>>;
  public readonly name: string;
  public readonly options?: FdoTableOptions<TRow>;

  public constructor(
    name: string,
    columns: List<IFdoColumn<TRow, Any, Any>>,
    options?: FdoTableOptions<TRow>
  ) {
    this.columns = columns;
    this.name = name;
    this.options = options;
  }

  public getRows(rowsNumber: number): List<TRow> {
    const { columns, options } = this;
    return FdoTableGetRowsDelegate(columns, rowsNumber, options);
  }
}
