import { KeyOf } from "@mantlebee/ts-core";

import { Column } from "@/models";
import { Row } from "@/types";

import { columnEnumGetValueDelegate } from "./utils";

export class ColumnEnum<TRow extends Row, TEnum> extends Column<TRow, TEnum> {
  public readonly enumerative!: TEnum;

  public constructor(name: KeyOf<TRow>, enumerative: TEnum) {
    super(name);
    this.enumerative = enumerative;
  }

  public getValue(): TEnum {
    return columnEnumGetValueDelegate(this.enumerative);
  }
}
