import { Column } from "@/models";

import { ColumnLastNameGetValueDelegate } from "./utils";

export class ColumnLastName<TRow> extends Column<TRow, string> {
  public getValue(): string {
    return ColumnLastNameGetValueDelegate();
  }
}
