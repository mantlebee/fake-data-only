import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { IColumn, IGenerator, IRelation, ITable } from "./interfaces";
import { ColumnOptions, Matrix, MatrixRow, Row } from "./types";
import { GeneratorGetMatrixDelegate, TableGetRowsDelegate } from "./utils";

export abstract class Column<
  TRow extends Row,
  TValue,
  TOptions extends ColumnOptions = ColumnOptions
> implements IColumn<TRow, TValue, TOptions>
{
  public readonly name: KeyOf<TRow>;
  public readonly options: TOptions;

  public constructor(name: KeyOf<TRow>, options?: TOptions) {
    this.name = name;
    this.options = options || ({} as TOptions);
  }

  public abstract getValue(row: TRow): TValue;
}

export class Generator implements IGenerator {
  public readonly relations?: List<IRelation<Any, Any>>;
  public readonly tables: List<ITable<Any>>;

  public constructor(
    tables: List<ITable<Any>>,
    relations?: List<IRelation<Any, Any>>
  ) {
    this.relations = relations;
    this.tables = tables;
  }

  public getMatrix(rowsNumberMap: Dictionary<number>): Matrix {
    const { relations, tables } = this;
    return GeneratorGetMatrixDelegate(tables, rowsNumberMap, relations);
  }
}

export abstract class Relation<TSourceRow extends Row, TTargetRow extends Row>
  implements IRelation<TSourceRow, TTargetRow>
{
  public readonly sourceColumnName: KeyOf<TSourceRow>;
  public readonly sourceTable: ITable<TSourceRow>;
  public readonly targetTable: ITable<TTargetRow>;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: ITable<TSourceRow>,
    targetTable: ITable<TTargetRow>
  ) {
    this.sourceColumnName = sourceColumnName;
    this.sourceTable = sourceTable;
    this.targetTable = targetTable;
  }

  protected getTableRows<TRow extends Row>(
    table: ITable<TRow>,
    matrix: Matrix
  ): List<TRow> {
    return (matrix.find((a) => a.table === table) as MatrixRow<TRow>).rows;
  }

  public abstract setValues(matrix: Matrix): void;
}

export class Table<TRow extends Row> implements ITable<TRow> {
  public readonly columns: List<IColumn<TRow>>;
  public readonly name: string;

  public constructor(name: string, columns: List<IColumn<TRow>>) {
    this.columns = columns;
    this.name = name;
  }

  public getRows(count: number): List<TRow> {
    const { columns } = this;
    return TableGetRowsDelegate(columns, count);
  }
}
