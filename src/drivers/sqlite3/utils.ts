import { isNullOrUndefined, List } from "@mantlebee/ts-core";

import { BooleanColumn, DateColumn } from "@/columns";
import { IColumn } from "@/interfaces";

import { ValueConverterDefault } from "./constants";
import { ValueConverter } from "./types";

export function adaptRowsValues<TRow>(
  rows: List<TRow>,
  columns: List<IColumn<TRow>>
): void {
  const convertersMap = createValueConvertersMap(columns);
  rows.forEach((row) => {
    columns.forEach((column) => {
      let value = row[column.name];
      if (!isNullOrUndefined(value))
        row[column.name] = convertersMap[column.name](value);
    });
  });
}

function createValueConvertersMap<TRow>(
  columns: List<IColumn<TRow>>
): Record<string, ValueConverter> {
  return columns.reduce(
    (result, current) => {
      let converter = ValueConverterDefault;
      if (current instanceof BooleanColumn) converter = (a) => (a ? 1 : 0);
      else if (current instanceof DateColumn)
        converter = (a) =>
          ValueConverterDefault(
            a.toISOString().replace("T", " ").replace("Z", "000")
          );
      result[current.name] = converter;
      return result;
    },
    {} as Record<string, ValueConverter>
  );
}
