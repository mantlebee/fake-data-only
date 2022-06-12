import { generateRandomNumber } from "@mantlebee/ts-random";

import { FdoColumnNumberOptionsDefault } from "./constants";
import { FdoColumnNumberOptions } from "./types";

export function FdoColumnNumberGetValueDelegate(
  options?: FdoColumnNumberOptions
): number {
  let { decimals = 0, max, min = 0 } = {
    ...FdoColumnNumberOptionsDefault,
    ...options,
  };
  return generateRandomNumber(max, min, decimals);
}
