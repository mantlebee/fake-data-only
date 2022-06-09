import { generateRandomDate } from "@mantlebee/ts-core";

import { FdoColumnDateOptions } from "./types";

export function FdoColumnDateValueDelegate(
  options?: FdoColumnDateOptions
): Date {
  let { dateFrom, dateTo } = { ...options };
  return generateRandomDate(dateTo, dateFrom, options);
}
