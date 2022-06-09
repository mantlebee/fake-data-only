import { ConstructorOf } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";
import { FdoColumnConstructor } from "@/columns";

import { FdoColumnDateOptions } from "./types";
import { FdoColumnDateValueDelegate } from "./utils";
import { FdoColumnDependencyAbstract } from "../dependency";

export class FdoColumnDate<TItem> extends FdoColumn<
  TItem,
  Date,
  FdoColumnDateOptions
> {
  public value(): Date {
    return FdoColumnDateValueDelegate(this.options);
  }
}

export class FdoColumnDateDependency<TItem> extends FdoColumnDependencyAbstract<
  TItem,
  Date,
  FdoColumnDateOptions,
  FdoColumnConstructor<TItem, Date, FdoColumnDateOptions>
> {
  public readonly columnConstructor: ConstructorOf<
    FdoColumnDate<TItem>
  > = FdoColumnDate;
}
