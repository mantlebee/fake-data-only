import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnDateOptions } from "./types";
import { getColumnDateValue } from "./utils";

export class ColumnDate<TRow extends Row> extends Column<
  TRow,
  Date,
  ColumnDateOptions
> {
  public getValue(row: TRow): Date {
    const options = this.getOptions(row);
    return getColumnDateValue(options);
  }
}
