import { FdoColumn } from "@/models";

import { FdoColumnFirstNameOptions } from "./types";
import { FdoColumnFirstNameValueDelegate } from "./utils";

export class FdoColumnFirstName<TRow> extends FdoColumn<
  TRow,
  string,
  FdoColumnFirstNameOptions
> {
  public value(): string {
    return FdoColumnFirstNameValueDelegate(this.options);
  }
}
