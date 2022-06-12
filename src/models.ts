import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import {
  IFdoColumn,
  IFdoGenerator,
  IFdoRelation,
  IFdoTable,
} from "./interfaces";
import {
  FdoColumnOptions,
  FdoMatrix,
  FdoMatrixRow,
  FdoTableOptions,
} from "./types";
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
  public readonly relations?: List<IFdoRelation<Any, Any>>;
  public readonly tables: List<IFdoTable<Any>>;

  public constructor(
    tables: List<IFdoTable<Any>>,
    relations?: List<IFdoRelation<Any, Any>>
  ) {
    this.relations = relations;
    this.tables = tables;
  }

  public getMatrix(rowsNumberMap: Dictionary<number>): FdoMatrix {
    const { relations, tables } = this;
    return FdoGeneratorGetMatrixDelegate(tables, rowsNumberMap, relations);
  }
}

export abstract class FdoRelation<TSourceRow, TTargetRow>
  implements IFdoRelation<TSourceRow, TTargetRow> {
  public readonly sourceColumnName: KeyOf<TSourceRow>;
  public readonly sourceTable: IFdoTable<TSourceRow>;
  public readonly targetTable: IFdoTable<TTargetRow>;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: IFdoTable<TSourceRow>,
    targetTable: IFdoTable<TTargetRow>
  ) {
    this.sourceColumnName = sourceColumnName;
    this.sourceTable = sourceTable;
    this.targetTable = targetTable;
  }

  protected getTableRows<TRow>(
    table: IFdoTable<TRow>,
    matrix: FdoMatrix
  ): List<TRow> {
    return (matrix.find((a) => a.table === table) as FdoMatrixRow<TRow>).rows;
  }

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
