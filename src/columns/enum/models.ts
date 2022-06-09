import { KeyOf } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";

import { FdoColumnEnumValueDelegate } from "./utils";

export class FdoColumnEnum<TItem, TEnum> extends FdoColumn<TItem, TEnum> {
  public readonly enumerative!: TEnum;

  public constructor(name: KeyOf<TItem>, enumerative: TEnum) {
    super(name);
    this.enumerative = enumerative;
  }

  public value(): TEnum {
    return FdoColumnEnumValueDelegate(this.enumerative);
  }
}
