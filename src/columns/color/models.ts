import { generateRandomColor } from "@mantlebee/ts-random";

import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnColorOptions } from "./types";

export class ColumnColor<TRow extends Row> extends Column<
  TRow,
  string,
  ColumnColorOptions
> {
  public getValue(): string {
    const { from, to, transparent } = { ...this.options };
    return generateRandomColor(transparent, from, to).rgba();
  }
}
