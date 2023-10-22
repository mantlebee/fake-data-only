import { ColumnOptions } from "@/types";

import { ColumnConstructor, ColumnOptionsValueGettersMap } from "./types";

export function ColumnDependencyGetValueDelegate<
  TRow,
  TValue,
  TOptions extends ColumnOptions,
  TConstructor extends ColumnConstructor<TRow, TValue, TOptions>,
>(
  row: TRow,
  columnConstructor: TConstructor,
  optionsValuesGetters: ColumnOptionsValueGettersMap<TRow, TOptions>,
): TValue {
  const options = {} as TOptions;
  Object.keys(optionsValuesGetters).forEach((key) => {
    const valueGetter =
      optionsValuesGetters[
        key as keyof ColumnOptionsValueGettersMap<TRow, TOptions>
      ];
    options[key as keyof TOptions] = valueGetter(row);
  });
  const column = new columnConstructor("", options);
  return column.getValue(row);
}
