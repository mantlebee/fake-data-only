import { Dictionary, Any, List, KeyOf } from "@mantlebee/ts-core";
import { generateRandomBoolean } from "@mantlebee/ts-random";

import { IFdoColumn, IFdoTable } from "./interfaces";
import { FdoMatrix, FdoTableOptions } from "./types";

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

export function FdoGeneratorGetMatrixDelegate(
  tables: List<IFdoTable<Any>>,
  rowsNumberMap: Dictionary<number>
): FdoMatrix {
  const matrix = tables.reduce((result, current) => {
    const { name } = current;
    const rowsNumber = rowsNumberMap[name];
    result.push({ table: current, rows: current.getRows(rowsNumber) });
    return result;
  }, [] as FdoMatrix);
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
