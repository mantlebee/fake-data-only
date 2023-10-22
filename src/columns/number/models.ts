import { ConstructorOf } from "@mantlebee/ts-core";

import { ColumnConstructor, ColumnDependencyAbstract } from "@/columns";
import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnNumberOptions } from "./types";
import { columnNumberGetValueDelegate } from "./utils";

export class ColumnNumber<TRow extends Row> extends Column<
  TRow,
  number,
  ColumnNumberOptions
> {
  public getValue(): number {
    return columnNumberGetValueDelegate(this.options);
  }
}

export class ColumnNumberDependency<TRow extends Row> extends ColumnDependencyAbstract<
  TRow,
  number,
  ColumnNumberOptions,
  ColumnConstructor<TRow, number, ColumnNumberOptions>
> {
  public readonly columnConstructor: ConstructorOf<ColumnNumber<TRow>> =
    ColumnNumber;
}
