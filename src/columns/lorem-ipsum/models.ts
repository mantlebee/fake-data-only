import { ColumnAbstract } from "@/models";

import { LoremIpsumColumnOptions } from "./types";
import { getLoremIpsumColumnValue } from "./utils";

export class LoremIpsumColumn<TRow> extends ColumnAbstract<
  TRow,
  string,
  LoremIpsumColumnOptions
> {
  public getValue(row: TRow): string {
    const options = this.getOptions(row);
    return getLoremIpsumColumnValue(options);
  }
}
