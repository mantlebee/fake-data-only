import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnStringOptions } from "./types";
import { columnStringGetValueDelegate } from "./utils";

export class ColumnString<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnStringOptions
> {
  public getValue(row: TRow): string {
    const options = this.getOptionsDelegate(row);
    return columnStringGetValueDelegate(options);
  }
}
