import { FdoColumn } from "@/models";

import { FdoColumnStringOptions } from "./types";
import { FdoColumnStringGetValueDelegate } from "./utils";

export class FdoColumnString<TRow> extends FdoColumn<
  TRow,
  string,
  FdoColumnStringOptions
> {
  public getValue(): string {
    return FdoColumnStringGetValueDelegate(this.options);
  }
}
