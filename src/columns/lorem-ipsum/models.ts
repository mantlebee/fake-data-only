import { Column } from "@/models";
import { Row } from "@/types";

import { LoremIpsumColumnOptions } from "./types";
import { getLoremIpsumColumnValue } from "./utils";

export class LoremIpsumColumn<TRow extends Row> extends Column<
  TRow,
  string,
  LoremIpsumColumnOptions
> {
  public getValue(row: TRow): string {
    const options = this.getOptions(row);
    return getLoremIpsumColumnValue(options);
  }
}
