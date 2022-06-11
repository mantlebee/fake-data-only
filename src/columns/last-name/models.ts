import { FdoColumn } from "@/models";

import { FdoColumnLastNameValueDelegate } from "./utils";

export class FdoColumnLastName<TRow> extends FdoColumn<TRow, string> {
  public value(): string {
    return FdoColumnLastNameValueDelegate();
  }
}
