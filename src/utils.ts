import { Dictionary, Any, List, KeyOf } from "@mantlebee/ts-core";
import { generateRandomBoolean } from "@mantlebee/ts-random";

import { IColumn, IRelation, ITable } from "./interfaces";
import { Matrix, TableOptions } from "./types";

function shouldBeNull<T>(
  column: IColumn<T, Any, Any>,
  options?: TableOptions<T>
): boolean {
  return Boolean(
    options &&
      options.nullables &&
      options.nullables.includes(column.name) &&
      generateRandomBoolean()
  );
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

export function TableGetRowsDelegate<T extends Dictionary<Any>>(
  columns: List<IColumn<T, Any, Any>>,
  rowsNumber: number,
  options?: TableOptions<T>
): List<T> {
  const items: List<T> = [];
  for (let i = 0; i < rowsNumber; ++i) {
    const row: T = {} as T;
    columns.forEach((a) => {
      if (shouldBeNull(a, options)) row[a.name] = null as T[KeyOf<T>];
      else row[a.name] = a.getValue({ ...row });
    });
    items.push(row);
  }
  return items;
}
