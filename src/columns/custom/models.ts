import { KeyOf } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";

export class FdoColumnCustom<TRow, TValue> extends FdoColumn<TRow, TValue> {
  private readonly getValueDelegate!: (row: TRow) => TValue;

  public constructor(
    name: KeyOf<TRow>,
    getValueDelegate: (row: TRow) => TValue
  ) {
    super(name);
    this.getValueDelegate = getValueDelegate;
  }

  public getValue(row: TRow): TValue {
    return this.getValueDelegate(row);
  }
}
