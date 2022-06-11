import { FdoColumnOptions } from "@/types";

import { FdoColumnConstructor, FdoColumnOptionsValueGettersMap } from "./types";

export function FdoColumnDependencyValueDelegate<
  TRow,
  TValue,
  TOptions extends FdoColumnOptions,
  TConstructor extends FdoColumnConstructor<TRow, TValue, TOptions>
>(
  item: TRow,
  columnConstructor: TConstructor,
  optionsValuesGetters: FdoColumnOptionsValueGettersMap<TRow, TOptions>
): TValue {
  const options = {} as TOptions;
  Object.keys(optionsValuesGetters).forEach((key) => {
    const valueGetter =
      optionsValuesGetters[
        key as keyof FdoColumnOptionsValueGettersMap<TRow, TOptions>
      ];
    options[key as keyof TOptions] = valueGetter(item);
  });
  const column = new columnConstructor("", options);
  return column.value(item);
}
