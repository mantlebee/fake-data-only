import { generateRandomBoolean } from "@mantlebee/ts-random";

import { ColumnAbstract } from "@/models";
import { Row } from "@/types";

/**
 * Generates a random boolean value.
 */
export class BooleanColumn<TRow extends Row> extends ColumnAbstract<
  TRow,
  boolean
> {
  public getValue(): boolean {
    return generateRandomBoolean();
  }
}
