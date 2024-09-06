import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnEmailOptions } from "./types";
import { getColumnEmailValue } from "./utils";

/**
 * Generates a random email with first name, last name and two-levels domain, e.g. "john.doe@outlook.com".
 * It is possible to restrict the choice of these three parameters, using the options.
 * The random email format is "[first-name].[last-name]@[domain]".
 */
export class ColumnEmail<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnEmailOptions
> {
  public getValue(row: TRow): string {
    const options = this.getOptions(row);
    return getColumnEmailValue(options);
  }
}
