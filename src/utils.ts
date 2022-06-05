import { Dictionary, Any, List } from "@mantlebee/ts-core";

import { IFdoColumn } from "./interfaces";

export function FdoGeneratorGenerateDelegate<T extends Dictionary<Any>>(
  columns: List<IFdoColumn<T, Any>>,
  rowsNumber: number
): List<T> {
  const items: List<T> = [];
  for (let i = 0; i < rowsNumber; ++i) {
    const item: T = {} as T;
    columns.forEach((a) => {
      item[a.name] = a.value({ ...item });
    });
    items.push(item);
  }
  return items;
}
