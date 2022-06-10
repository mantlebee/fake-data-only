import { generateRandomBoolean } from "@mantlebee/ts-random";

import { FdoColumn } from "@/models";

export class FdoColumnBoolean<TItem> extends FdoColumn<TItem, boolean> {
  public value(): boolean {
    return generateRandomBoolean();
  }
}
