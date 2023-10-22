import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnNumberOptions } from "./types";
import { getColumnNumberValue } from "./utils";

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
