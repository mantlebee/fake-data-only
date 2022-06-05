import { generateRandomBoolean, KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

export class FdoColumnBoolean<TItem> implements IFdoColumn<TItem, boolean> {
  public readonly name!: KeyOf<TItem>;

  public constructor(name: KeyOf<TItem>) {
    this.name = name;
  }

  public value(): boolean {
    return generateRandomBoolean();
  }
}
