import { ColumnOptions } from "@/types";

/**
 * {@link ColumnDateOptions} date option.
 * `from` and `to` option can be a simple date or a more detailed configuration,
 * where also `hours`, `minutes`, and `seconds` are specified.
 */
export type ColumnDateOption = {
  date: Date;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

/**
 * {@link ColumnDate} options.
 * @prop `dateFrom` - Begin of a date range. If omitted the default is inherited by the `generateRandomDate` method from `@mantlebee/ts-random` package.
 * @prop `dateTo` - End of a date range. If omitted the default is inherited by the `generateRandomDate` method from `@mantlebee/ts-random` package.
 */
export type ColumnDateOptions = ColumnOptions & {
  from?: Date | ColumnDateOption;
  to?: Date | ColumnDateOption;
};
