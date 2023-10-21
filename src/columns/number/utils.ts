import { generateRandomNumber } from "@mantlebee/ts-random";

import { ColumnNumberOptionsDefault } from "./constants";
import { ColumnNumberOptions } from "./types";

export function ColumnNumberGetValueDelegate(
  options?: ColumnNumberOptions
): number {
  let { decimals = 0, max, min = 0 } = {
    ...ColumnNumberOptionsDefault,
    ...options,
  };
  return generateRandomNumber(max, min, decimals);
}
