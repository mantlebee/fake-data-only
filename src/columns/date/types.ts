import { GenerateRandomDateOptions } from "@mantlebee/ts-random";

import { ColumnOptions } from "@/types";

/**
 * {@link ColumnDate} options.
 * Extends the type `GenerateRandomDateOptions` i.e. the options of the `generateRandomDate` method from `@mantlebee/ts-random` package.
 * @prop `dateFrom` - Begin of a date range. If omitted the default is inherited by the `generateRandomDate` method from `@mantlebee/ts-random` package.
 * @prop `dateTo` - End of a date range. If omitted the default is inherited by the `generateRandomDate` method from `@mantlebee/ts-random` package.
 */
export type ColumnDateOptions = ColumnOptions &
  GenerateRandomDateOptions & {
    dateFrom?: Date;
    dateTo?: Date;
  };
