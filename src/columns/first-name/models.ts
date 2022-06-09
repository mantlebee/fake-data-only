import { FdoColumn } from "@/models";

import { FdoColumnFirstNameOptions } from "./types";
import { FdoColumnFirstNameValueDelegate } from "./utils";

export class FdoColumnFirstName<TItem> extends FdoColumn<
  TItem,
  string,
  FdoColumnFirstNameOptions
> {
  public value(): string {
    return FdoColumnFirstNameValueDelegate(this.options);
  }
}
