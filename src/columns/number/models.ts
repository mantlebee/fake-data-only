import { ColumnAbstract } from "@/models";
import { Row } from "@/types";

import { NumberColumnOptions } from "./types";
import { getNumberColumnValue } from "./utils";

/**
 * Generates a random number.
 * It is possible to specify min and max values, and the amount of decimals.
 */
export class NumberColumn<TRow extends Row> extends ColumnAbstract<
  TRow,
  number,
  NumberColumnOptions
> {
  public getValue(row: TRow): number {
    const options = this.getOptions(row);
    return getNumberColumnValue(options);
  }
}
