import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnLoremIpsumOptions } from "./types";
import { getColumnLoremIpsumValue } from "./utils";

export class ColumnLoremIpsum<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnLoremIpsumOptions
> {
  public getValue(row: TRow): string {
    const options = this.getOptions(row);
    return getColumnLoremIpsumValue(options);
  }
}
