import { FdoColumnOptions } from "@/types";

import { FdoColumnConstructor, FdoColumnOptionsValueGettersMap } from "./types";

export function FdoColumnDependencyGetValueDelegate<
  TRow,
  TValue,
  TOptions extends FdoColumnOptions,
  TConstructor extends FdoColumnConstructor<TRow, TValue, TOptions>
>(
  row: TRow,
  columnConstructor: TConstructor,
  optionsValuesGetters: FdoColumnOptionsValueGettersMap<TRow, TOptions>
): TValue {
  const options = {} as TOptions;
  Object.keys(optionsValuesGetters).forEach((key) => {
    const valueGetter =
      optionsValuesGetters[
        key as keyof FdoColumnOptionsValueGettersMap<TRow, TOptions>
      ];
    options[key as keyof TOptions] = valueGetter(row);
  });
  const column = new columnConstructor("", options);
  return column.getValue(row);
}
