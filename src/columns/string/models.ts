import { IFdoColumn } from "@/interfaces";
import { FdoColumn } from "@/models";

import { FdoColumnStringOptions } from "./types";
import { FdoColumnStringValueDelegate } from "./utils";

export class FdoColumnString<TItem> extends FdoColumn<
  TItem,
  string,
  FdoColumnStringOptions
> {
  public value(): string {
    return FdoColumnStringValueDelegate(this.options);
  }
}
