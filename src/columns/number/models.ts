import { KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnNumberOptions } from "./types";
import { FdoColumnNumberValueDelegate } from "./utils";

export class FdoColumnNumber<TItem> implements IFdoColumn<TItem, number> {
  public readonly name!: KeyOf<TItem>;
  public readonly options!: FdoColumnNumberOptions<TItem>;

  public constructor(
    name: KeyOf<TItem>,
    options: FdoColumnNumberOptions<TItem>
  ) {
    this.name = name;
    this.options = options;
  }

  public value(item: TItem): number {
    return FdoColumnNumberValueDelegate(item, this.options);
  }
}
