import { generateRandomDate } from "@mantlebee/ts-random";

import { FdoColumnDateOptions } from "./types";

export function FdoColumnDateValueDelegate(
  options?: FdoColumnDateOptions
): Date {
  let { dateFrom, dateTo } = { ...options };
  return generateRandomDate(dateTo, dateFrom, options);
}
