import {
  Any,
  Dictionary,
  KeyOf,
  List,
  TypedKey,
  createTypedKey,
} from "@mantlebee/ts-core";

import { IColumn, IDatabase, ITable, IColumnRelation } from "./interfaces";
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
export abstract class ColumnAbstract<
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
export abstract class ColumnRelationAbstract<
    TRow extends Row,
    TTargetRow extends Row,
    TValue = Any,
    TOptions extends ColumnOptions = ColumnOptions,
  >
  extends ColumnAbstract<TRow, TValue, TOptions>
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
  public readonly tables: List<Table<Any>>;

  public constructor(tables: List<Table<Any>>) {
    this.tables = tables;
  }

  public getDataset(countsMap: Dictionary<number>): Dataset {
    const { tables } = this;
    return getDatabaseDataset(tables, countsMap);
  }
}

/**
 * Implementation of {@link ITable}.
 * It uses the delegate {@link getTableRows} to generate the rows.
 */
export class Table<TRow extends Row> implements ITable<TRow> {
  public readonly columns: List<ColumnAbstract<TRow>>;
  public readonly key: TableKey<TRow>;
  public readonly name: string;

  /**
   *
   * @param key TypedKey, created with {@link createTableKey}. Description must be exists.
   * @param columns List of table columns.
   */
  public constructor(key: TypedKey<TRow>, columns: List<ColumnAbstract<TRow>>) {
    this.columns = columns;
    this.key = key;
    this.name = key.description!;
  }

  public getRows(count: number): List<TRow> {
    const { columns } = this;
    return getTableRows(columns, count);
  }
}
