import { Dictionary, KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnEnumOptions } from "./types";
import { FdoColumnEnumValueDelegate } from "./utils";

export class FdoColumnEnum<TItem, TEnum> implements IFdoColumn<TItem, TEnum> {
  public readonly name!: KeyOf<TItem>;
  public readonly options!: FdoColumnEnumOptions<TEnum>;

  public constructor(name: KeyOf<TItem>, options: FdoColumnEnumOptions<TEnum>) {
    this.name = name;
    this.options = options;
  }

  public value(): TEnum {
    return FdoColumnEnumValueDelegate(this.options);
  }
}
