import { Column } from "@/models";

import { ColumnFirstNameOptions } from "./types";
import { ColumnFirstNameGetValueDelegate } from "./utils";

export class ColumnFirstName<TRow> extends Column<
  TRow,
  string,
  ColumnFirstNameOptions
> {
  public getValue(): string {
    return ColumnFirstNameGetValueDelegate(this.options);
  }
}
