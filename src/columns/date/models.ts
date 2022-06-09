import { FdoColumn } from "@/models";

import { FdoColumnDateOptions } from "./types";
import { FdoColumnDateValueDelegate } from "./utils";

export class FdoColumnDate<TItem> extends FdoColumn<
  TItem,
  Date,
  FdoColumnDateOptions<TItem>
> {
  public value(item: TItem): Date {
    return FdoColumnDateValueDelegate(item, this.options);
  }
}
