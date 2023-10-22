import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnFirstNameOptions } from "./types";
import { getColumnFirstNameValue } from "./utils";

export class ColumnFirstName<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnFirstNameOptions
> {
  public getValue(row: TRow): string {
    const options = this.getOptions(row);
    return getColumnFirstNameValue(options);
  }
}
