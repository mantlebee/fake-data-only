import {
  Any,
  Dictionary,
  KeyOf,
  List,
  createTypedKey,
} from "@mantlebee/ts-core";

import {
  IColumn,
  IRelation,
  IDatabase,
  ITable,
  IColumnRelation,
} from "./interfaces";
import {
  ColumnOptionsGetter,
  Dataset,
  Row,
  ColumnOptions,
  TableKey,
} from "./types";
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
 * Abstract implementation of {@link IColumnRelation}
 */
export abstract class ColumnRelation<
    TRow extends Row,
    TTargetRow extends Row,
    TValue = Any,
    TOptions extends ColumnOptions = ColumnOptions,
  >
  extends Column<TRow, TValue, TOptions>
  implements IColumnRelation<TRow, TTargetRow, TValue>
{
  protected defaultValue: TValue;
  public targetTableKey: TableKey<TTargetRow>;

  public constructor(
    name: KeyOf<TRow>,
    defaultValue: TValue,
    targetTableKey: TableKey<TTargetRow>,
    getOptions: ColumnOptionsGetter<TRow, TOptions> = () => ({}) as TOptions
  ) {
    super(name, getOptions);
    this.defaultValue = defaultValue;
    this.targetTableKey = targetTableKey;
  }

  public getValue(): TValue {
    return this.defaultValue;
  }

  public abstract setValues(
    sourceRows: List<TRow>,
    targetRows: List<TTargetRow>,
    dataset: Dataset
  ): void;
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
  public readonly sourceTableKey: TableKey<TSourceRow>;
  public readonly targetTableKey: TableKey<TTargetRow>;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTableKey: TableKey<TSourceRow>,
    targetTableKey: TableKey<TTargetRow>
  ) {
    this.sourceColumnName = sourceColumnName;
    this.sourceTableKey = sourceTableKey;
    this.targetTableKey = targetTableKey;
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
  public readonly key: TableKey<TRow>;
  public readonly name: string;

  public constructor(
    name: string,
    columns: List<Column<TRow>>,
    key = createTypedKey<TRow>()
  ) {
    this.columns = columns;
    this.key = key;
    this.name = name;
  }

  public getRows(count: number): List<TRow> {
    const { columns } = this;
    return getTableRows(columns, count);
  }
}
