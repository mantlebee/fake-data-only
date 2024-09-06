import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnStringOptions } from "./types";
import { getColumnStringValue } from "./utils";

/**
 * Generates a random string.
 * It is possible to restrict the min and max length, and which symbols must be included.
 */
export class ColumnString<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnStringOptions
> {
  public getValue(row: TRow): string {
    const options = this.getOptions(row);
    return getColumnStringValue(options);
  }
}
