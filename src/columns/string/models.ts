import { IFdoColumn } from "@/interfaces";
import { KeyOf } from "@mantlebee/ts-core";

import { FdoColumnStringOptions } from "./types";
import { FdoColumnStringValueDelegate } from "./utils";

export class FdoColumnString<TItem> implements IFdoColumn<TItem, string> {
  public readonly name!: KeyOf<TItem>;
  public readonly options!: FdoColumnStringOptions;

  public constructor(name: KeyOf<TItem>, options: FdoColumnStringOptions) {
    this.name = name;
    this.options = options;
  }

  public value(): string {
    return FdoColumnStringValueDelegate(this.options);
  }
}
