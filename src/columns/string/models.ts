import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnStringOptions } from "./types";
import { getColumnStringValue } from "./utils";

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
