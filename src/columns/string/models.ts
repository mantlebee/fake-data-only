import { Column } from "@/models";

import { ColumnStringOptions } from "./types";
import { ColumnStringGetValueDelegate } from "./utils";

export class ColumnString<TRow> extends Column<
  TRow,
  string,
  ColumnStringOptions
> {
  public getValue(): string {
    return ColumnStringGetValueDelegate(this.options);
  }
}
