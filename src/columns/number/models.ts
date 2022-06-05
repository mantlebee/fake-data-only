import { KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnNumberOptions } from "./types";
import { FdoColumnNumberValueDelegate } from "./utils";

export class FdoColumnNumber<TItem> implements IFdoColumn<TItem, number> {
  public readonly name!: KeyOf<TItem>;
  public readonly options!: FdoColumnNumberOptions;

  public constructor(name: KeyOf<TItem>, options: FdoColumnNumberOptions) {
    this.name = name;
    this.options = options;
  }

  public value(): number {
    return FdoColumnNumberValueDelegate(this.options);
  }
}
