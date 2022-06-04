import { generateRandomNumber } from "@mantlebee/ts-core";

import { FdoColumnNumberOptions } from "./types";

export function FdoColumnNumberValueDelegate(
  options: FdoColumnNumberOptions
): number {
  const { max, min } = options;
  if (max === min) return max;
  return generateRandomNumber(min, max);
}
