import { FdoColumnOptions } from "@/types";

import { FdoColumnConstructor, FdoColumnOptionsValueGettersMap } from "./types";

export function FdoColumnDependencyValueDelegate<
  TItem,
  TValue,
  TOptions extends FdoColumnOptions,
  TConstructor extends FdoColumnConstructor<TItem, TValue, TOptions>
>(
  item: TItem,
  columnConstructor: TConstructor,
  optionsValuesGetters: FdoColumnOptionsValueGettersMap<TItem, TOptions>
): TValue {
  const options = {} as TOptions;
  Object.keys(optionsValuesGetters).forEach((key) => {
    const valueGetter =
      optionsValuesGetters[
        key as keyof FdoColumnOptionsValueGettersMap<TItem, TOptions>
      ];
    options[key as keyof TOptions] = valueGetter(item);
  });
  const column = new columnConstructor("", options);
  return column.value(item);
}
