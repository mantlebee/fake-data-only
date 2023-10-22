import { Dictionary, Any, List, KeyOf } from "@mantlebee/ts-core";
import { generateRandomBoolean } from "@mantlebee/ts-random";

import { IColumn, ITable } from "./interfaces";
import { Data, Relation, Row } from "./types";
import { ColumnRelation } from "./models";

const DefaultCount = 0;

function shouldBeNull<TRow extends Row>(column: IColumn<TRow>): boolean {
  const { nullable } = column.options;
  return Boolean(
    (column instanceof ColumnRelation && nullable) ||
      (nullable && generateRandomBoolean()),
  );
}

export function DatabaseGetDataDelegate(
  tables: List<ITable<Any>>,
  countsMap: Dictionary<number>,
  relations?: List<Relation>,
): Data {
  const data = tables.reduce((result, current) => {
    const { name } = current;
    const count = countsMap[name] || DefaultCount;
    result[name] = { table: current, rows: current.getRows(count) };
    return result;
  }, {} as Data);
  if (relations)
    relations.forEach((a) => {
      const { sourceColumn, sourceTable, targetTable } = a;
      const sourceData = data[sourceTable.name];
      const targetData = data[targetTable.name];
      if (sourceData && targetData)
        sourceColumn.setValues(sourceData.rows, targetData.rows, data);
    });
  return data;
}

export function TableGetRowsDelegate<TRow extends Row>(
  columns: List<IColumn<TRow>>,
  count: number,
): List<TRow> {
  const items: List<TRow> = [];
  for (let i = 0; i < count; i++) {
    const row: TRow = {} as TRow;
    columns.forEach((a) => {
      if (shouldBeNull(a)) row[a.name] = null as TRow[KeyOf<TRow>];
      else row[a.name] = a.getValue({ ...row });
    });
    items.push(row);
  }
  return items;
}
