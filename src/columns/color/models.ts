import { generateRandomColor } from "@mantlebee/ts-random";

import { FdoColumn } from "@/models";

import { FdoColumnColorOptions } from "./types";

export class FdoColumnColor<TRow> extends FdoColumn<
  TRow,
  string,
  FdoColumnColorOptions
> {
  public getValue(): string {
    const { from, to, transparent } = { ...this.options };
    return generateRandomColor(transparent, from, to).rgba();
  }
}
