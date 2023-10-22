import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnEmailOptions } from "./types";
import { columnEmailGetValueDelegate } from "./utils";

export class ColumnEmail<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnEmailOptions
> {
  public getValue(row: TRow): string {
    const options = this.getOptionsDelegate(row);
    return columnEmailGetValueDelegate(options);
  }
}
