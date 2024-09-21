import { Any, KeyOf, List, ValueOrGetter } from "@mantlebee/ts-core";

import { NumberOrRange } from "./support";
import { RowsCountsMap, Dataset, TableKey, ColumnOptions } from "./types";

/**
 * Represents the column of a ({@link ITable}).
 * Its purpose is to generate a value for the row's field of the row generated by the table.
 * @typeParam TRow - Type of the row.
 * @typeParam TValue - Type of the column's value.
 */
export interface IColumn<
  TRow,
  TValue = Any,
  TOptions extends ColumnOptions = ColumnOptions,
> {
  /**
   * Column's name. It must be unique in the {@link ITable}.
   */
  readonly name: KeyOf<TRow>;
  /**
   * Column's options to generate the new row's field value.
   * Options includes restrictions on how the new value must be generated.
   * The restrictions can depend on other row's fields values,
   * because options can be a function, too, where the first parameter is the row,
   * with the fields values generated by previous columns already processed.
   */
  readonly options?: ValueOrGetter<TOptions, TRow>;
  /**
   * Generates a value for the row's field.
   * The column musn't change the row instance.
   * @param row Row which will be updated. The row has the values of the previous columns already processed.
   * @returns the new row's field value that will be eventually applied by the {@link ITable}.
   */
  getValue(row: TRow): TValue;
}

/**
 * Represents the column of a table ({@link ITable}), used to generate data based on values of rows from a different table.
 * Its purpose is to generate a default value for the row generated by the table, and to update it when target table's rows are generated.
 * @typeParam TRow - Type of the row.
 * @typeParam TTargetRow - Type of the row of the related table.
 * @typeParam TValue - Type of the column's value.
 */
export interface IColumnRelation<TRow, TTargetRow, TValue = Any>
  extends IColumn<TRow, TValue> {
  /**
   * Update source table rows using a target table rows or the entire dataset.
   * @param sourceRows List of rows to update of the source table.
   * @param targetRows List of rows of the target table.
   * @param dataset The entire database dataset.
   */
  setValues(
    sourceRows: List<TRow>,
    targetRows: List<TTargetRow>,
    dataset: Dataset
  ): void;
}

/**
 * Represents a database with its own tables ({@link ITable}).
 * Its purpose is to generate the table's rows, if needed, and to convert the result into a JSON or a more human-readable.
 * The {@link Dataset} object is a dictionary, where the keys are the tables' keys and the values are the generated rows.
 */
export interface IDatabase {
  readonly tables: List<ITable<Any>>;
  getDataset(): Dataset;
  getTable<TRow>(tableKey: TableKey<TRow>): ITable<TRow>;
  seed(rowsCountMap: RowsCountsMap): IDatabase;
}

/**
 * Represents a table.
 * Its purpose is to generate rows.
 * @typeParam TRow - Type of the row.
 */
export interface ITable<TRow> {
  /**
   * The table's columns used to generate values for the rows.
   */
  readonly columns: List<IColumn<TRow>>;
  /**
   * The table's key.
   */
  readonly key: TableKey<TRow>;
  /**
   * The table's name.
   */
  readonly name: string;
  /**
   * Returns a label that identifies and summarizes a row.
   * @param row row to identify through a label.
   */
  getRowLabel(row: TRow): string;
  /**
   * Returns the tables rows.
   * Returns an empty list, if {@link seed} hasn't be called, first.
   */
  getRows(): List<TRow>;
  /**
   * Generates a specific amount of rows.
   * @param rowsCount Number of rows to generate.
   * @returns the table instance. Useful to concatenate operations.
   */
  seed(rowsCount: NumberOrRange): ITable<TRow>;
}
