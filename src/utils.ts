import { Dictionary, Any, List, KeyOf, KeysOf } from "@mantlebee/ts-core";
import { generateRandomBoolean } from "@mantlebee/ts-random";

import { IFdoColumn } from "./interfaces";
import { FdoMatrixTable, FdoTableOptions } from "./types";

function shouldBeNull<T>(
  column: IFdoColumn<T, Any, Any>,
  options?: FdoTableOptions<T>
): boolean {
  return Boolean(
    options &&
      options.nullables &&
      options.nullables.includes(column.name) &&
      generateRandomBoolean()
  );
}

export function FdoMatrixGetMatrixDelegate<
  TTablesMap extends Dictionary<FdoMatrixTable<Any>>
>(tablesMap: TTablesMap): KeysOf<TTablesMap, List<Any>> {
  const matrix = Object.keys(tablesMap).reduce((result, current) => {
    const { table, rowsNumber } = tablesMap[current];
    result[current as keyof TTablesMap] = table.getRows(rowsNumber);
    return result;
  }, {} as KeysOf<TTablesMap, List<Any>>);
  return matrix;
}

export function FdoTableGetRowsDelegate<T extends Dictionary<Any>>(
  columns: List<IFdoColumn<T, Any, Any>>,
  rowsNumber: number,
  options?: FdoTableOptions<T>
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
