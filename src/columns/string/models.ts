import { Column } from "@/models";
import { Row } from "@/types";

import { StringColumnOptions } from "./types";
import { getStringColumnValue } from "./utils";

/**
 * Generates a random string.
 * It is possible to restrict the min and max length, and which symbols must be included.
 */
export class StringColumn<TRow extends Row> extends Column<
  TRow,
  string,
  StringColumnOptions
> {
  public getValue(row: TRow): string {
    const options = this.getOptions(row);
    return getStringColumnValue(options);
  }
}
