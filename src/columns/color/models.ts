import { generateRandomColor } from "@mantlebee/ts-random";

import { FdoColumn } from "@/models";

import { FdoColumnColorOptions } from "./types";

export class FdoColumnColor<TItem> extends FdoColumn<
  TItem,
  string,
  FdoColumnColorOptions
> {
  public value(): string {
    const { from, to, transparent } = { ...this.options };
    return generateRandomColor(transparent, from, to).rgba();
  }
}
