import { generateRandomBoolean } from "@mantlebee/ts-random";

import { Column } from "@/models";

export class ColumnBoolean<TRow> extends Column<TRow, boolean> {
  public getValue(): boolean {
    return generateRandomBoolean();
  }
}
