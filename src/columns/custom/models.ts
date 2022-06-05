import { Delegate, KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

export class FdoColumnCustom<TItem, TValue>
  implements IFdoColumn<TItem, TValue> {
  public readonly name!: KeyOf<TItem>;
  public readonly getValueDelegate!: (item: TItem) => TValue;

  public constructor(
    name: KeyOf<TItem>,
    getValueDelegate: (item: TItem) => TValue
  ) {
    this.name = name;
    this.getValueDelegate = getValueDelegate;
  }

  public value(item: TItem): TValue {
    return this.getValueDelegate(item);
  }
}
