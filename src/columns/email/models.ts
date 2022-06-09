import { ConstructorOf } from "@mantlebee/ts-core";

import { FdoColumnConstructor, FdoColumnDependencyAbstract } from "@/columns";
import { FdoColumn } from "@/models";

import { FdoColumnEmailOptions } from "./types";
import { FdoColumnEmailValueDelegate } from "./utils";

export class FdoColumnEmail<TItem> extends FdoColumn<
  TItem,
  string,
  FdoColumnEmailOptions
> {
  public value(): string {
    return FdoColumnEmailValueDelegate(this.options);
  }
}

export class FdoColumnEmailDependency<
  TItem
> extends FdoColumnDependencyAbstract<
  TItem,
  string,
  FdoColumnEmailOptions,
  FdoColumnConstructor<TItem, string, FdoColumnEmailOptions>
> {
  public readonly columnConstructor: ConstructorOf<
    FdoColumnEmail<TItem>
  > = FdoColumnEmail;
}
