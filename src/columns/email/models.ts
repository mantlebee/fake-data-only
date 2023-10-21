import { ConstructorOf } from "@mantlebee/ts-core";

import { ColumnConstructor, ColumnDependencyAbstract } from "@/columns";
import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnEmailOptions } from "./types";
import { ColumnEmailGetValueDelegate } from "./utils";

export class ColumnEmail<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnEmailOptions
> {
  public getValue(): string {
    return ColumnEmailGetValueDelegate(this.options);
  }
}

export class ColumnEmailDependency<
  TRow extends Row
> extends ColumnDependencyAbstract<
  TRow,
  string,
  ColumnEmailOptions,
  ColumnConstructor<TRow, string, ColumnEmailOptions>
> {
  public readonly columnConstructor: ConstructorOf<ColumnEmail<TRow>> =
    ColumnEmail;
}
