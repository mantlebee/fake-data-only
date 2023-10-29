import { generateRandomDate } from "@mantlebee/ts-random";

import { ColumnDateOptions } from "./types";

/**
 * Generates a random date from an optional date and time range.
 * @param options "From" and "to" options to restrict the date generation. It includes restriction for date and time.
 * @returns A random date from an optional date and time range.
 */
export function getColumnDateValue(options: ColumnDateOptions): Date {
  let { dateFrom, dateTo } = options;
  return generateRandomDate(dateTo, dateFrom, options);
}
