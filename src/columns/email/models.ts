import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnEmailOptions } from "./types";
import { getColumnEmailValue } from "./utils";

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
