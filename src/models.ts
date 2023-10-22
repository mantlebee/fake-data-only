import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { IColumn, IColumnRelation, IDatabase, ITable } from "./interfaces";
import { ColumnOptions, Data, Relation, Row } from "./types";
import { databaseGetDataDelegate, tableGetRowsDelegate } from "./utils";

export abstract class Column<
  TRow extends Row,
  TValue,
  TOptions extends ColumnOptions = ColumnOptions,
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

export abstract class ColumnRelation<
    TSourceRow extends Row,
    TTargetRow extends Row,
    TValue = Any,
    TOptions extends ColumnOptions = ColumnOptions,
  >
  extends Column<TSourceRow, TValue, TOptions>
  implements IColumnRelation<TSourceRow, TTargetRow, TValue, TOptions>
{
  private readonly defaultValue: TValue;

  public constructor(
    name: KeyOf<TSourceRow>,
    defaultValue: TValue,
    options?: TOptions,
  ) {
    super(name, options);
    this.defaultValue = defaultValue;
  }

  public getValue(row: TSourceRow): TValue {
    return this.defaultValue;
  }

  public abstract setValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>,
    data: Data,
  ): void;
}

export class Generator implements IDatabase {
  public readonly relations?: List<Relation>;
  public readonly tables: List<ITable<Any>>;

  public constructor(tables: List<ITable<Any>>, relations?: List<Relation>) {
    this.relations = relations;
    this.tables = tables;
  }

  public getData(countsMap: Dictionary<number>): Data {
    const { relations, tables } = this;
    return databaseGetDataDelegate(tables, countsMap, relations);
  }
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
    return tableGetRowsDelegate(columns, count);
  }
}
