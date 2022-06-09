import { generateRandomBoolean } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";

export class FdoColumnBoolean<TItem> extends FdoColumn<TItem, boolean> {
  public value(): boolean {
    return generateRandomBoolean();
  }
}
