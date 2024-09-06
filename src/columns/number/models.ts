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

/**
 * Column used as placeholder value, for relations.
 * Returns always the default value for numbers, which is `0`.
 * The relation will then change this default value.
 */
export class ColumnNumberDefault<TRow extends Row> extends Column<
  TRow,
  number
> {
  public getValue(row: TRow): number {
    return 0;
  }
}
