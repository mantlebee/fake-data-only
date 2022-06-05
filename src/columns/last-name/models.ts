import { KeyOf } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnLastNameValueDelegate } from "./utils";

export class FdoColumnLastName<TItem> implements IFdoColumn<TItem, string> {
  public readonly name!: KeyOf<TItem>;

  public constructor(name: KeyOf<TItem>) {
    this.name = name;
  }

  public value(): string {
    return FdoColumnLastNameValueDelegate();
  }
}
