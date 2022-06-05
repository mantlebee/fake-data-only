import { KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnEmailOptions } from "./types";
import { FdoColumnEmailValueDelegate } from "./utils";

export class FdoColumnEmail<TItem> implements IFdoColumn<TItem, string> {
  public readonly name!: KeyOf<TItem>;
  public readonly options!: FdoColumnEmailOptions;

  public constructor(name: KeyOf<TItem>, options: FdoColumnEmailOptions = {}) {
    this.name = name;
    this.options = options;
  }

  public value(): string {
    return FdoColumnEmailValueDelegate(this.options);
  }
}
