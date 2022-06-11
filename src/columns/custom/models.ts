import { KeyOf } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";

export class FdoColumnCustom<TRow, TValue> extends FdoColumn<TRow, TValue> {
  private readonly getValue!: (item: TRow) => TValue;

  public constructor(name: KeyOf<TRow>, getValue: (item: TRow) => TValue) {
    super(name);
    this.getValue = getValue;
  }

  public value(item: TRow): TValue {
    return this.getValue(item);
  }
}
