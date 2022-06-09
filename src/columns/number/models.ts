import { ConstructorOf } from "@mantlebee/ts-core";

import { FdoColumnConstructor, FdoColumnDependencyAbstract } from "@/columns";
import { FdoColumn } from "@/models";

import { FdoColumnNumberOptions } from "./types";
import { FdoColumnNumberValueDelegate } from "./utils";

export class FdoColumnNumber<TItem> extends FdoColumn<
  TItem,
  number,
  FdoColumnNumberOptions
> {
  public value(): number {
    return FdoColumnNumberValueDelegate(this.options);
  }
}

export class FdoColumnNumberDependency<
  TItem
> extends FdoColumnDependencyAbstract<
  TItem,
  number,
  FdoColumnNumberOptions,
  FdoColumnConstructor<TItem, number, FdoColumnNumberOptions>
> {
  public readonly columnConstructor: ConstructorOf<
    FdoColumnNumber<TItem>
  > = FdoColumnNumber;
}
