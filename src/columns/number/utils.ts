import { generateRandomNumber } from "@mantlebee/ts-core";

import { FdoColumnNumberOptions } from "./types";

export function FdoColumnNumberValueDelegate(
  options: FdoColumnNumberOptions
): number {
  const { decimals = 0, max, min = 0 } = options;
  if (max === min) return max;
  return generateRandomNumber(max, min, decimals);
}
