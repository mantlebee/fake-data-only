import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnNumberOptions } from "./types";
import { columnNumberGetValueDelegate } from "./utils";

export class ColumnNumber<TRow extends Row> extends Column<
  TRow,
  number,
  ColumnNumberOptions
> {
  public getValue(row: TRow): number {
    const options = this.getOptionsDelegate(row);
    return columnNumberGetValueDelegate(options);
  }
}
