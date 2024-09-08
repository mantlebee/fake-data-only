import { Column } from "@/models";
import { Row } from "@/types";

import { DateColumnOptions } from "./types";
import { getDateColumnValue } from "./utils";

/**
 * Generates a random date.
 * It is possible to restrict the range of date and time, through the column options.
 */
export class DateColumn<TRow extends Row> extends Column<
  TRow,
  Date,
  DateColumnOptions
> {
  public getValue(row: TRow): Date {
    const options = this.getOptions(row);
    return getDateColumnValue(options);
  }
}
