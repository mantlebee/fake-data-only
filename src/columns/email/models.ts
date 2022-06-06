import { KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnEmailOptions } from "./types";
import { FdoColumnEmailValueDelegate } from "./utils";

export class FdoColumnEmail<TItem> implements IFdoColumn<TItem, string> {
  private readonly options!: FdoColumnEmailOptions<TItem>;
  public readonly name!: KeyOf<TItem>;

  public constructor(
    name: KeyOf<TItem>,
    options: FdoColumnEmailOptions<TItem> = {}
  ) {
    this.name = name;
    this.options = options;
  }

  public value(item: TItem): string {
    return FdoColumnEmailValueDelegate(item, this.options);
  }
}
