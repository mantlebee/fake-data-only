import {
  Dictionary,
  Any,
  List,
  KeyOf,
  generateRandomBoolean,
} from "@mantlebee/ts-core";

import { IFdoColumn } from "./interfaces";
import { FdoGeneratorOptions } from "./types";

function isNullable<T>(
  column: IFdoColumn<T, Any>,
  options?: FdoGeneratorOptions<T>
): boolean {
  return Boolean(
    options && options.nullables && options.nullables.includes(column.name)
  );
}

export function FdoGeneratorGenerateDelegate<T extends Dictionary<Any>>(
  columns: List<IFdoColumn<T, Any>>,
  rowsNumber: number,
  options?: FdoGeneratorOptions<T>
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
