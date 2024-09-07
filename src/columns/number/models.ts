import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnNumberOptions } from "./types";
import { getColumnNumberValue } from "./utils";

/**
 * Generates a random number.
 * It is possible to specify min and max values, and the amount of decimals.
 */
export class ColumnNumber<TRow extends Row> extends Column<
  TRow,
  number,
  ColumnNumberOptions
> {
  public getValue(row: TRow): number {
    const options = this.getOptions(row);
    return getColumnNumberValue(options);
  }
}
