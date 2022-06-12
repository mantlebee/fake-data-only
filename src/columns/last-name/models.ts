import { FdoColumn } from "@/models";

import { FdoColumnLastNameGetValueDelegate } from "./utils";

export class FdoColumnLastName<TRow> extends FdoColumn<TRow, string> {
  public getValue(): string {
    return FdoColumnLastNameGetValueDelegate();
  }
}
