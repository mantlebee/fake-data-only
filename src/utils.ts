import { Dictionary, Any, List, KeyOf } from "@mantlebee/ts-core";
import { generateRandomBoolean } from "@mantlebee/ts-random";

import { ColumnOptions, Dataset, Row } from "./types";
import { Column, Relation, Table } from "./models";

/**
 * Default values of rows to generate.
 * It is used by the delegate {@link getDatabaseDataset} if the counts map doesn't include a key of the current table processing.
 */
const DefaultRowsCount = 0;

/**
 * Generates a database dataset using the given tables and relations.
 * It is separated into two steps:
 *  1. it generates the table rows.
 *  2. process the relations to update the rows values.
 * Columns of type relation of the tables are processed during the second step if and only if a relation referring that column is present. If not, the default value is not updated.
 * @param tables List of tables forming part of the database.
 * @param countsMap Dictionary with the tables counts, used to generate a specific amount of rows for each table. It is a dictionary where the keys are the tables names and the values the row counts to generate.
 * @param relations List of relations to process to update the rows values.
 * @returns the database dataset, it is a dictionary, where the keys are the tables names and the values are objects with the table instance and its generated rows.
 */
export function getDatabaseDataset(
  tables: List<Table<Any>>,
  countsMap: Dictionary<number>,
  relations?: List<Relation<Any, Any>>
): Dataset {
  const dataset = tables.reduce((result, current) => {
    const { name } = current;
    const count = countsMap[name] || DefaultRowsCount;
    result[name] = { table: current, rows: current.getRows(count) };
    return result;
  }, {} as Dataset);
  if (relations)
    relations.forEach((a) => {
      const { sourceTable, targetTable } = a;
      const sourceData = dataset[sourceTable.name];
      const targetData = dataset[targetTable.name];
      if (sourceData && targetData)
        a.setValues(sourceData.rows, targetData.rows, dataset);
    });
  return dataset;
}

/**
 * Generates rows for a table where the keys are the columns names.
 * If the column if nullable, the {@link shouldBeNull} defines if the `null` value is used or a random one must be generated by the column {@link getValue} method.
 * @param columns List of columns used to update the rows values.
 * @param count Number of rows to generated.
 * @returns Rows generated where the keys are the columns names.
 */
export function getTableRows<TRow extends Row>(
  columns: List<Column<TRow, Any>>,
  count: number
): List<TRow> {
  const items: List<TRow> = [];
  for (let i = 0; i < count; i++) {
    const row: TRow = {} as TRow;
    columns.forEach((a) => {
      const options = a.getOptions(row);
      if (shouldBeNull(a, options)) row[a.name] = null as TRow[KeyOf<TRow>];
      else row[a.name] = a.getValue({ ...row });
    });
    items.push(row);
  }
  return items;
}

/**
 * Returns a random boolean value indicating if to generate a value for the current column or to set the `null` value.
 * If the column is a relation column and it is nullable, the method returns `true`.
 * @param column Column processing during the table rows generation.
 * @returns A boolean value indicating if to generate a value for the current column or to set the `null` value.
 */
function shouldBeNull<TRow extends Row>(
  column: Column<TRow>,
  options: ColumnOptions
): boolean {
  const { nullable } = options;
  return Boolean(
    (column instanceof Relation && nullable) ||
      (nullable && generateRandomBoolean())
  );
}
