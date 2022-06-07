import { generateRandomNumber } from "@mantlebee/ts-core";

import { FdoColumnNumberOptions } from "./types";

export function FdoColumnNumberValueDelegate<TItem>(
  item: TItem,
  options: FdoColumnNumberOptions<TItem>
): number {
  let { decimals = 0, dependencies, max, min = 0 } = options;
  if (dependencies) {
    if (dependencies.decimals)
      decimals = (item[dependencies.decimals.name] as unknown) as number;
    if (dependencies.max)
      max = (item[dependencies.max.name] as unknown) as number;
    if (dependencies.min)
      min = (item[dependencies.min.name] as unknown) as number;
  }
  return generateRandomNumber(max, min, decimals);
}
