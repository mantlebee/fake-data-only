import { KeyOf } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";

export class FdoColumnCustom<TItem, TValue> extends FdoColumn<TItem, TValue> {
  private readonly getValue!: (item: TItem) => TValue;

  public constructor(name: KeyOf<TItem>, getValue: (item: TItem) => TValue) {
    super(name);
    this.getValue = getValue;
  }

  public value(item: TItem): TValue {
    return this.getValue(item);
  }
}
