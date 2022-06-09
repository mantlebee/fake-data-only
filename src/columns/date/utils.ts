import { generateRandomDate } from "@mantlebee/ts-core";

import { FdoColumnDateOptions } from "./types";

export function FdoColumnDateValueDelegate<TItem>(
  item: TItem,
  options?: FdoColumnDateOptions<TItem>
): Date {
  let { dateFrom, dateTo, dependencies } = { ...options };
  if (dependencies) {
    if (dependencies.dateFrom)
      dateFrom = (item[dependencies.dateFrom.name] as unknown) as Date;
    if (dependencies.dateTo)
      dateTo = (item[dependencies.dateTo.name] as unknown) as Date;
  }
  return generateRandomDate(dateTo, dateFrom, options);
}
