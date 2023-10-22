import { KeyOf } from "@mantlebee/ts-core";

import { Column } from "@/models";
import { Row } from "@/types";

/**
 * Generic column. Generates a value using a delegate passed to the constructor.
 */
export class ColumnCustom<TRow extends Row, TValue> extends Column<
  TRow,
  TValue
> {
  /**
   * Delegate used to generate the value.
   */
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
