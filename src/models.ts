import { Any, KeyOf, List } from "@mantlebee/ts-core";

import { IColumn, IDatabase, ITable, IColumnRelation } from "./interfaces";
import {
  ColumnOptionsGetter,
  Dataset,
  Row,
  ColumnOptions,
  CountsMap,
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
 * The resulting {@link Dataset} can be accessed both through the table's name and key.
 */
export class Database implements IDatabase {
  public readonly tables: List<Table<Any>>;

  public constructor(tables: List<Table<Any>>) {
    this.tables = tables;
  }

  /**
   * Generates the database dataset, it is a dictionary, where the keys are the tables names and keys, and the values are the generated rows.
   * @param countsMap Dictionary with the tables counts, used to generate a specific amount of rows for each table. It is a dictionary where the keys are the tables names and keys, and the values the row counts to generate.
   * @returns a {@link Dataset} that can be accessed both through the table's name and key
   */
  public getDataset(countsMap: CountsMap): Dataset {
    const { tables } = this;
    return getDatabaseDataset(tables, countsMap);
  }
}

/**
 * Implementation of {@link ITable}.
 * It uses the delegate {@link getTableRows} to generate the rows.
 */
export class Table<TRow extends Row> implements ITable<TRow> {
  private _columns: List<ColumnAbstract<TRow>>;
  private _key: TableKey<TRow>;
  private _rows: List<TRow> = [];

  /**
   *
   * @param key {@link TableKey}, created with {@link createTableKey}. Description must be exists.
   * @param columns List of table columns.
   */
  public constructor(key: TableKey<TRow>, columns: List<ColumnAbstract<TRow>>) {
    this._columns = columns;
    this._key = key;
  }

  public getColumns(): List<IColumn<TRow, any>> {
    return this._columns;
  }
  public getKey(): TableKey<TRow> {
    return this._key;
  }
  public getRows(): List<TRow> {
    return this._rows;
  }

  public seed(rowsCount: number): ITable<TRow> {
    this._rows = getTableRows(this._columns, rowsCount);
    return this;
  }
}
