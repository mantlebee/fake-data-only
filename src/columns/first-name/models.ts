import { FdoColumn } from "@/models";

import { FdoColumnFirstNameOptions } from "./types";
import { FdoColumnFirstNameGetValueDelegate } from "./utils";

export class FdoColumnFirstName<TRow> extends FdoColumn<
  TRow,
  string,
  FdoColumnFirstNameOptions
> {
  public getValue(): string {
    return FdoColumnFirstNameGetValueDelegate(this.options);
  }
}
