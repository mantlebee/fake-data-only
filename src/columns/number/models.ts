import { ConstructorOf } from "@mantlebee/ts-core";

import { ColumnConstructor, ColumnDependencyAbstract } from "@/columns";
import { Column } from "@/models";

import { ColumnNumberOptions } from "./types";
import { ColumnNumberGetValueDelegate } from "./utils";

export class ColumnNumber<TRow> extends Column<
  TRow,
  number,
  ColumnNumberOptions
> {
  public getValue(): number {
    return ColumnNumberGetValueDelegate(this.options);
  }
}

export class ColumnNumberDependency<
  TRow
> extends ColumnDependencyAbstract<
  TRow,
  number,
  ColumnNumberOptions,
  ColumnConstructor<TRow, number, ColumnNumberOptions>
> {
  public readonly columnConstructor: ConstructorOf<
    ColumnNumber<TRow>
  > = ColumnNumber;
}
