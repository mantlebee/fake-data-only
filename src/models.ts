import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { IColumn, IRelation, IDatabase, ITable } from "./interfaces";
import { ColumnOptionsGetter, Dataset, Row, ColumnOptions } from "./types";
import { getDatabaseDataset, getTableRows } from "./utils";

/**
 * Abstract implementation of {@link IColumn}.
 */
export abstract class Column<
  TRow extends Row,
  TValue = Any,
  TOptions extends ColumnOptions = ColumnOptions,
> implements IColumn<TRow, TValue>
{
  public readonly name: KeyOf<TRow>;
  public readonly getOptions: ColumnOptionsGetter<TRow, TOptions>;

  public constructor(
    name: KeyOf<TRow>,
    getOptions: ColumnOptionsGetter<TRow, TOptions> = () => ({}) as TOptions
  ) {
    this.name = name;
    this.getOptions = getOptions;
  }

  public abstract getValue(row: TRow): TValue;
}

/**
 * Implementation of {@link IDatabase}.
 * It uses the delegate {@link getDatabaseDataset} to generate the dataset.
 */
export class Database implements IDatabase {
  public readonly relations?: List<Relation<Any, Any>>;
  public readonly tables: List<Table<Any>>;

  public constructor(
    tables: List<Table<Any>>,
    relations?: List<Relation<Any, Any>>
  ) {
    this.relations = relations;
    this.tables = tables;
  }

  public getDataset(countsMap: Dictionary<number>): Dataset {
    const { relations, tables } = this;
    return getDatabaseDataset(tables, countsMap, relations);
  }
}

/**
 * Abstract implementation of {@link IRelation}.
 */
export abstract class Relation<TSourceRow extends Row, TTargetRow extends Row>
  implements IRelation<TSourceRow, TTargetRow>
{
  protected readonly sourceColumnName: KeyOf<TSourceRow>;
  public readonly sourceTable: Table<TSourceRow>;
  public readonly targetTable: Table<TTargetRow>;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: Table<TSourceRow>,
    targetTable: Table<TTargetRow>
  ) {
    this.sourceColumnName = sourceColumnName;
    this.sourceTable = sourceTable;
    this.targetTable = targetTable;
  }

  public abstract setValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>,
    dataset: Dataset
  ): void;
}

/**
 * Implementation of {@link ITable}.
 * It uses the delegate {@link getTableRows} to generate the rows.
 */
export class Table<TRow extends Row> implements ITable<TRow> {
  public readonly columns: List<Column<TRow>>;
  public readonly name: string;

  public constructor(name: string, columns: List<Column<TRow>>) {
    this.columns = columns;
    this.name = name;
  }

  public getRows(count: number): List<TRow> {
    const { columns } = this;
    return getTableRows(columns, count);
  }
}
