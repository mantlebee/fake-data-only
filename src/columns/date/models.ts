import { KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnDateOptions } from "./types";
import { FdoColumnDateValueDelegate } from "./utils";

export class FdoColumnDate<TItem> implements IFdoColumn<TItem, Date> {
  public readonly name!: KeyOf<TItem>;
  public readonly options!: FdoColumnDateOptions;

  public constructor(name: KeyOf<TItem>, options: FdoColumnDateOptions = {}) {
    this.name = name;
    this.options = options;
  }

  public value(): Date {
    return FdoColumnDateValueDelegate(this.options);
  }
}
