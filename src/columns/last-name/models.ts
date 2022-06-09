import { FdoColumn } from "@/models";

import { FdoColumnLastNameValueDelegate } from "./utils";

export class FdoColumnLastName<TItem> extends FdoColumn<TItem, string> {
  public value(): string {
    return FdoColumnLastNameValueDelegate();
  }
}
