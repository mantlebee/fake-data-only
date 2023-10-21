import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnStringOptions } from "./types";
import { ColumnStringGetValueDelegate } from "./utils";

export class ColumnString<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnStringOptions
> {
  public getValue(): string {
    return ColumnStringGetValueDelegate(this.options);
  }
}
