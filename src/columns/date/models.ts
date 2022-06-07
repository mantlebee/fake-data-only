import { KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnDateOptions } from "./types";
import { FdoColumnDateValueDelegate } from "./utils";

export class FdoColumnDate<TItem> implements IFdoColumn<TItem, Date> {
  public readonly name!: KeyOf<TItem>;
  public readonly options!: FdoColumnDateOptions<TItem>;

  public constructor(
    name: KeyOf<TItem>,
    options: FdoColumnDateOptions<TItem> = {}
  ) {
    this.name = name;
    this.options = options;
  }

  public value(item: TItem): Date {
    return FdoColumnDateValueDelegate(item, this.options);
  }
}
