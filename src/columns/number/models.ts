import { ConstructorOf } from "@mantlebee/ts-core";

import { FdoColumnConstructor, FdoColumnDependencyAbstract } from "@/columns";
import { FdoColumn } from "@/models";

import { FdoColumnNumberOptions } from "./types";
import { FdoColumnNumberGetValueDelegate } from "./utils";

export class FdoColumnNumber<TRow> extends FdoColumn<
  TRow,
  number,
  FdoColumnNumberOptions
> {
  public getValue(): number {
    return FdoColumnNumberGetValueDelegate(this.options);
  }
}

export class FdoColumnNumberDependency<
  TRow
> extends FdoColumnDependencyAbstract<
  TRow,
  number,
  FdoColumnNumberOptions,
  FdoColumnConstructor<TRow, number, FdoColumnNumberOptions>
> {
  public readonly columnConstructor: ConstructorOf<
    FdoColumnNumber<TRow>
  > = FdoColumnNumber;
}
