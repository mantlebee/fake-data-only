import { KeyOf } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";

import { FdoColumnEnumValueDelegate } from "./utils";

export class FdoColumnEnum<TRow, TEnum> extends FdoColumn<TRow, TEnum> {
  public readonly enumerative!: TEnum;

  public constructor(name: KeyOf<TRow>, enumerative: TEnum) {
    super(name);
    this.enumerative = enumerative;
  }

  public value(): TEnum {
    return FdoColumnEnumValueDelegate(this.enumerative);
  }
}
