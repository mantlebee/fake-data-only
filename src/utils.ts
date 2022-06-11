import { Dictionary, Any, List, KeyOf, KeysOf } from "@mantlebee/ts-core";
import { generateRandomBoolean } from "@mantlebee/ts-random";

import { IFdoColumn, IFdoTable } from "./interfaces";
import { FdoMatrixTable, FdoTableOptions } from "./types";

function isNullable<T>(
  column: IFdoColumn<T, Any, Any>,
  options?: FdoTableOptions<T>
): boolean {
  return Boolean(
    options && options.nullables && options.nullables.includes(column.name)
  );
}

export function FdoMatrixGenerateDelegate<
  TTablesMap extends Dictionary<FdoMatrixTable<Any>>
>(tablesMap: TTablesMap): KeysOf<TTablesMap, List<Any>> {
  const matrix = Object.keys(tablesMap).reduce((result, current) => {
    const { table, rowsNumber } = tablesMap[current];
    result[current as keyof TTablesMap] = table.generate(rowsNumber);
    return result;
  }, {} as KeysOf<TTablesMap, List<Any>>);
  return matrix;
}

export function FdoTableGenerateDelegate<T extends Dictionary<Any>>(
  columns: List<IFdoColumn<T, Any, Any>>,
  rowsNumber: number,
  options?: FdoTableOptions<T>
): List<T> {
  const items: List<T> = [];
  for (let i = 0; i < rowsNumber; ++i) {
    const item: T = {} as T;
    columns.forEach((a) => {
      if (isNullable(a, options) && generateRandomBoolean())
        item[a.name] = null as T[KeyOf<T>];
      else item[a.name] = a.value({ ...item });
    });
    items.push(item);
  }
  return items;
}
