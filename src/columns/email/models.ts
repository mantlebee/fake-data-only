import { ConstructorOf } from "@mantlebee/ts-core";

import { ColumnConstructor, ColumnDependencyAbstract } from "@/columns";
import { Column } from "@/models";

import { ColumnEmailOptions } from "./types";
import { ColumnEmailGetValueDelegate } from "./utils";

export class ColumnEmail<TRow> extends Column<
  TRow,
  string,
  ColumnEmailOptions
> {
  public getValue(): string {
    return ColumnEmailGetValueDelegate(this.options);
  }
}

export class ColumnEmailDependency<TRow> extends ColumnDependencyAbstract<
  TRow,
  string,
  ColumnEmailOptions,
  ColumnConstructor<TRow, string, ColumnEmailOptions>
> {
  public readonly columnConstructor: ConstructorOf<
    ColumnEmail<TRow>
  > = ColumnEmail;
}
