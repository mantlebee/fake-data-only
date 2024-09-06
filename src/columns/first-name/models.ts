import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnFirstNameOptions } from "./types";
import { getColumnFirstNameValue } from "./utils";

/**
 * Generates a random male or female american first name.
 * It is possible to restrict the gender of the name to generate, using the options.
 */
export class ColumnFirstName<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnFirstNameOptions
> {
  public getValue(row: TRow): string {
    const options = this.getOptions(row);
    return getColumnFirstNameValue(options);
  }
}
