import { ConstructorOf } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";
import { FdoColumnConstructor } from "@/columns";

import { FdoColumnDateOptions } from "./types";
import { FdoColumnDateValueDelegate } from "./utils";
import { FdoColumnDependencyAbstract } from "../dependency";

export class FdoColumnDate<TRow> extends FdoColumn<
  TRow,
  Date,
  FdoColumnDateOptions
> {
  public value(): Date {
    return FdoColumnDateValueDelegate(this.options);
  }
}

export class FdoColumnDateDependency<TRow> extends FdoColumnDependencyAbstract<
  TRow,
  Date,
  FdoColumnDateOptions,
  FdoColumnConstructor<TRow, Date, FdoColumnDateOptions>
> {
  public readonly columnConstructor: ConstructorOf<
    FdoColumnDate<TRow>
  > = FdoColumnDate;
}
