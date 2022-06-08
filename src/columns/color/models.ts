import { KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnColorOptions } from "./types";
import { FdoColumnColorValueDelegate } from "./utils";

export class FdoColumnColor<TItem> implements IFdoColumn<TItem, string> {
  public readonly name!: KeyOf<TItem>;
  public readonly options!: FdoColumnColorOptions;

  public constructor(name: KeyOf<TItem>, options: FdoColumnColorOptions = {}) {
    this.name = name;
    this.options = options;
  }

  public value(): string {
    return FdoColumnColorValueDelegate(this.options);
  }
}
