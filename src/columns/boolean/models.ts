import { generateRandomBoolean } from "@mantlebee/ts-random";

import { Column } from "@/models";
import { Row } from "@/types";

export class ColumnBoolean<TRow extends Row> extends Column<TRow, boolean> {
  public getValue(): boolean {
    return generateRandomBoolean();
  }
}
