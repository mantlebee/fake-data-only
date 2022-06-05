import { KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnEmailDependencies, FdoColumnEmailOptions } from "./types";
import { FdoColumnEmailValueDelegate } from "./utils";

export class FdoColumnEmail<TItem> implements IFdoColumn<TItem, string> {
  private readonly dependencies!: FdoColumnEmailDependencies<TItem>;
  private readonly options!: FdoColumnEmailOptions;
  public readonly name!: KeyOf<TItem>;

  public constructor(
    name: KeyOf<TItem>,
    options: FdoColumnEmailOptions = {},
    dependencies: FdoColumnEmailDependencies<TItem> = {}
  ) {
    this.dependencies = dependencies;
    this.name = name;
    this.options = options;
  }

  public value(item: TItem): string {
    return FdoColumnEmailValueDelegate(item, this.options, this.dependencies);
  }
}
