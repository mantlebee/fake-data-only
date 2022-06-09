import { FdoColumn } from "@/models";

import { FdoColumnEmailOptions } from "./types";
import { FdoColumnEmailValueDelegate } from "./utils";

export class FdoColumnEmail<TItem> extends FdoColumn<
  TItem,
  string,
  FdoColumnEmailOptions<TItem>
> {
  public value(item: TItem): string {
    return FdoColumnEmailValueDelegate(item, this.options);
  }
}
