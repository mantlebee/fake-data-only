import { generateRandomDate } from "@mantlebee/ts-random";

import { ColumnDateOptions } from "./types";

export function columnDateGetValueDelegate(options?: ColumnDateOptions): Date {
  let { dateFrom, dateTo } = { ...options };
  return generateRandomDate(dateTo, dateFrom, options);
}
