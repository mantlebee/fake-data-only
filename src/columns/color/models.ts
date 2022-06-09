import { FdoColumn } from "@/models";

import { FdoColumnColorOptions } from "./types";
import { FdoColumnColorValueDelegate } from "./utils";

export class FdoColumnColor<TItem> extends FdoColumn<
  TItem,
  string,
  FdoColumnColorOptions
> {
  public value(): string {
    return FdoColumnColorValueDelegate(this.options);
  }
}
