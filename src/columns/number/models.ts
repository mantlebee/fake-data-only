import { FdoColumn } from "@/models";

import { FdoColumnNumberOptions } from "./types";
import { FdoColumnNumberValueDelegate } from "./utils";

export class FdoColumnNumber<TItem> extends FdoColumn<
  TItem,
  number,
  FdoColumnNumberOptions<TItem>
> {
  public value(item: TItem): number {
    return FdoColumnNumberValueDelegate(item, this.options);
  }
}
