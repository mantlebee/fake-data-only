import { KeyOf, NumericIdentityManager } from "@mantlebee/ts-core";

import { FdoColumn } from "@/models";

import { FdoColumnIdOptions } from "./types";
import { FdoColumnIdStartsFrom } from "./constants";

export class FdoColumnId<TRow> extends FdoColumn<
  TRow,
  number,
  FdoColumnIdOptions
> {
  private readonly identityManager!: NumericIdentityManager;

  public constructor(name: KeyOf<TRow>, options?: FdoColumnIdOptions) {
    super(name, options);
    let startsFrom = FdoColumnIdStartsFrom;
    if (options && options.startsFrom) startsFrom = options.startsFrom;
    const lastValue = startsFrom - 1;
    this.identityManager = new NumericIdentityManager(lastValue);
  }

  public getValue(): number {
    return this.identityManager.newValue();
  }
}
