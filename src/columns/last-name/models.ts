import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnLastNameGetValueDelegate } from "./utils";

export class ColumnLastName<TRow extends Row> extends Column<TRow, string> {
  public getValue(): string {
    return ColumnLastNameGetValueDelegate();
  }
}
