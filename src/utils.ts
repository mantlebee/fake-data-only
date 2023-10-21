import { Dictionary, Any, List, KeyOf } from "@mantlebee/ts-core";
import { generateRandomBoolean } from "@mantlebee/ts-random";

import { IColumn, IRelation, ITable } from "./interfaces";
import { Matrix, Row } from "./types";

function shouldBeNull<TRow extends Row>(column: IColumn<TRow>): boolean {
  return Boolean(column.options.nullable && generateRandomBoolean());
}

export function GeneratorGetMatrixDelegate(
  tables: List<ITable<Any>>,
  rowsNumberMap: Dictionary<number>,
  relations?: List<IRelation<Any, Any>>
): Matrix {
  const matrix = tables.reduce((result, current) => {
    const { name } = current;
    const rowsNumber = rowsNumberMap[name];
    result.push({ table: current, rows: current.getRows(rowsNumber) });
    return result;
  }, [] as Matrix);
  if (relations) relations.forEach((a) => a.setValues(matrix));
  return matrix;
}

export function TableGetRowsDelegate<TRow extends Row>(
  columns: List<IColumn<TRow>>,
  count: number
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
