import { KeyOf } from "@mantlebee/ts-core";

import { Column } from "@/models";
import { Row } from "@/types";

export class ColumnCustom<TRow extends Row, TValue> extends Column<TRow, TValue> {
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
