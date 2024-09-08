import { ColumnAbstract } from "@/models";
import { Row } from "@/types";

import { getLastNameColumnValue } from "./utils";

/**
 * Generates a random american last name.
 */
export class LastNameColumn<TRow extends Row> extends ColumnAbstract<
  TRow,
  string
> {
  public getValue(row: TRow): string {
    return getLastNameColumnValue();
  }
}
