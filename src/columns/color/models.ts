import { generateRandomColor } from "@mantlebee/ts-random";

import { Column } from "@/models";

import { ColumnColorOptions } from "./types";

export class ColumnColor<TRow> extends Column<
  TRow,
  string,
  ColumnColorOptions
> {
  public getValue(): string {
    const { from, to, transparent } = { ...this.options };
    return generateRandomColor(transparent, from, to).rgba();
  }
}
