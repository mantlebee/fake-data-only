import { ConstructorOf } from "@mantlebee/ts-core";

import { Column } from "@/models";
import { ColumnConstructor } from "@/columns";
import { Row } from "@/types";

import { ColumnDateOptions } from "./types";
import { ColumnDateGetValueDelegate } from "./utils";
import { ColumnDependencyAbstract } from "../dependency";

export class ColumnDate<TRow extends Row> extends Column<
  TRow,
  Date,
  ColumnDateOptions
> {
  public getValue(): Date {
    return ColumnDateGetValueDelegate(this.options);
  }
}

export class ColumnDateDependency<
  TRow extends Row,
> extends ColumnDependencyAbstract<
  TRow,
  Date,
  ColumnDateOptions,
  ColumnConstructor<TRow, Date, ColumnDateOptions>
> {
  public readonly columnConstructor: ConstructorOf<ColumnDate<TRow>> =
    ColumnDate;
}
