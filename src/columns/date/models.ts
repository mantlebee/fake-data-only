import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnDateOptions } from "./types";
import { columnDateGetValueDelegate } from "./utils";

export class ColumnDate<TRow extends Row> extends Column<
  TRow,
  Date,
  ColumnDateOptions
> {
  public getValue(row: TRow): Date {
    const options = this.getOptionsDelegate(row);
    return columnDateGetValueDelegate(options);
  }
}
