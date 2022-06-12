import { ConstructorOf } from "@mantlebee/ts-core";

import { FdoColumnConstructor, FdoColumnDependencyAbstract } from "@/columns";
import { FdoColumn } from "@/models";

import { FdoColumnEmailOptions } from "./types";
import { FdoColumnEmailGetValueDelegate } from "./utils";

export class FdoColumnEmail<TRow> extends FdoColumn<
  TRow,
  string,
  FdoColumnEmailOptions
> {
  public getValue(): string {
    return FdoColumnEmailGetValueDelegate(this.options);
  }
}

export class FdoColumnEmailDependency<TRow> extends FdoColumnDependencyAbstract<
  TRow,
  string,
  FdoColumnEmailOptions,
  FdoColumnConstructor<TRow, string, FdoColumnEmailOptions>
> {
  public readonly columnConstructor: ConstructorOf<
    FdoColumnEmail<TRow>
  > = FdoColumnEmail;
}
