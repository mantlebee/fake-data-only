import { generateRandomNumber } from "@mantlebee/ts-core";

import { FdoColumnNumberOptionsDefault } from "./constants";
import { FdoColumnNumberOptions } from "./types";

export function FdoColumnNumberValueDelegate(
  options?: FdoColumnNumberOptions
): number {
  let { decimals = 0, max, min = 0 } = {
    ...FdoColumnNumberOptionsDefault,
    ...options,
  };
  return generateRandomNumber(max, min, decimals);
}
