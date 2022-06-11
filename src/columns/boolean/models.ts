import { generateRandomBoolean } from "@mantlebee/ts-random";

import { FdoColumn } from "@/models";

export class FdoColumnBoolean<TRow> extends FdoColumn<TRow, boolean> {
  public value(): boolean {
    return generateRandomBoolean();
  }
}
