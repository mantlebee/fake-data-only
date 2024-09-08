import {
  generateRandomDate,
  GenerateRandomDateOptions,
} from "@mantlebee/ts-random";

import { ColumnDateOption, ColumnDateOptions } from "./types";
import { isDate } from "@mantlebee/ts-core";

/**
 * Generates a random date from an optional date and time range.
 * @param options "from" and "to" options to restrict the date generation. It includes restriction for date and time.
 * @returns A random date from an optional date and time range.
 */
export function getColumnDateValue(options?: ColumnDateOptions): Date {
  if (options) {
    let { from, to } = options;
    const randomDateOptions: GenerateRandomDateOptions = {};
    if (from && !isDate(from)) {
      const { date, hours, minutes, seconds } = from as ColumnDateOption;
      from = date;
      randomDateOptions.hoursFrom = hours;
      randomDateOptions.minutesFrom = minutes;
      randomDateOptions.secondsFrom = seconds;
    }
    if (to && !isDate(to)) {
      const { date, hours, minutes, seconds } = to as ColumnDateOption;
      to = date;
      randomDateOptions.hoursTo = hours;
      randomDateOptions.minutesTo = minutes;
      randomDateOptions.secondsTo = seconds;
    }
    return generateRandomDate(to as Date, from as Date, randomDateOptions);
  }
  return generateRandomDate();
}
