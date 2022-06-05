import { KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnFirstNameOptions } from "./types";
import { FdoColumnFirstNameValueDelegate } from "./utils";

export class FdoColumnFirstName<TItem> implements IFdoColumn<TItem, string> {
  public readonly name!: KeyOf<TItem>;
  public readonly options!: FdoColumnFirstNameOptions;

  public constructor(
    name: KeyOf<TItem>,
    options: FdoColumnFirstNameOptions = {}
  ) {
    this.name = name;
    this.options = options;
  }

  public value(): string {
    return FdoColumnFirstNameValueDelegate(this.options);
  }
}
