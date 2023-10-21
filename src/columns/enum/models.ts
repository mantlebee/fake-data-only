import { KeyOf } from "@mantlebee/ts-core";

import { Column } from "@/models";

import { ColumnEnumGetValueDelegate } from "./utils";

export class ColumnEnum<TRow, TEnum> extends Column<TRow, TEnum> {
  public readonly enumerative!: TEnum;

  public constructor(name: KeyOf<TRow>, enumerative: TEnum) {
    super(name);
    this.enumerative = enumerative;
  }

  public getValue(): TEnum {
    return ColumnEnumGetValueDelegate(this.enumerative);
  }
}
