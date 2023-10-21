import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnFirstNameOptions } from "./types";
import { ColumnFirstNameGetValueDelegate } from "./utils";

export class ColumnFirstName<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnFirstNameOptions
> {
  public getValue(): string {
    return ColumnFirstNameGetValueDelegate(this.options);
  }
}
