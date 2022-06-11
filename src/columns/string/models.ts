import { FdoColumn } from "@/models";

import { FdoColumnStringOptions } from "./types";
import { FdoColumnStringValueDelegate } from "./utils";

export class FdoColumnString<TRow> extends FdoColumn<
  TRow,
  string,
  FdoColumnStringOptions
> {
  public value(): string {
    return FdoColumnStringValueDelegate(this.options);
  }
}
