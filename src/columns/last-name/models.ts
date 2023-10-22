import { Column } from "@/models";
import { Row } from "@/types";

import { getColumnLastNameValue } from "./utils";

export class ColumnLastName<TRow extends Row> extends Column<TRow, string> {
  public getValue(row: TRow): string {
    return getColumnLastNameValue();
  }
}
