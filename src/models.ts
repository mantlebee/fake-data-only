import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { IColumn, IColumnRelation, IDatabase, ITable } from "./interfaces";
import {
  GetColumnOptionsDelegate,
  Dataset,
  Relation,
  Row,
  ColumnOptions,
} from "./types";
import { databaseGetDatasetDelegate, tableGetRowsDelegate } from "./utils";

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
  public readonly getOptionsDelegate: GetColumnOptionsDelegate<TRow, TOptions>;

  public constructor(
    name: KeyOf<TRow>,
    getOptionsDelegate: GetColumnOptionsDelegate<TRow, TOptions> = () =>
      ({}) as TOptions
  ) {
    this.name = name;
    this.getOptionsDelegate = getOptionsDelegate;
  }

  public abstract getValue(row: TRow): TValue;
}

/**
 * Abstract implementation of {@link IColumnRelation}.
 * The {@link getValue} method is implemented returning a default value defined during initialization.
 * The defaullt value is replaced only if rows are generated by a {@link Database} instance, via the {@link setValues} method.
 */
export abstract class ColumnRelation<
    TSourceRow extends Row,
    TTargetRow extends Row,
    TValue = Any,
    TOptions extends ColumnOptions = ColumnOptions,
  >
  extends Column<TSourceRow, TValue, TOptions>
  implements IColumnRelation<TSourceRow, TTargetRow, TValue>
{
  /**
   * The default value is returned by the {@link getValue} method during rows generation.
   */
  private readonly defaultValue: TValue;

  public constructor(
    name: KeyOf<TSourceRow>,
    defaultValue: TValue,
    getOptionsDelegate?: GetColumnOptionsDelegate<TSourceRow, TOptions>
  ) {
    super(name, getOptionsDelegate);
    this.defaultValue = defaultValue;
  }

  public getValue(row: TSourceRow): TValue {
    return this.defaultValue;
  }

  public abstract setValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>,
    dataset: Dataset
  ): void;
}

/**
 * Implementation of {@link IDatabase}.
 * It uses the delegate {@link databaseGetDatasetDelegate} to generate the dataset.
 */
export class Database implements IDatabase {
  public readonly relations?: List<Relation>;
  public readonly tables: List<Table<Any>>;

  public constructor(tables: List<Table<Any>>, relations?: List<Relation>) {
    this.relations = relations;
    this.tables = tables;
  }

  public getDataset(countsMap: Dictionary<number>): Dataset {
    const { relations, tables } = this;
    return databaseGetDatasetDelegate(tables, countsMap, relations);
  }
}

/**
 * Implementation of {@link ITable}.
 * It uses the delegate {@link tableGetRowsDelegate} to generate the rows.
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
    return tableGetRowsDelegate(columns, count);
  }
}
