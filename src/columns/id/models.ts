import { KeyOf, NumericIdentityManager } from "@mantlebee/ts-core";

import { Column } from "@/models";

import { ColumnIdOptions } from "./types";
import { ColumnIdStartsFrom } from "./constants";

export class ColumnId<TRow> extends Column<
  TRow,
  number,
  ColumnIdOptions
> {
  private readonly identityManager!: NumericIdentityManager;

  public constructor(name: KeyOf<TRow>, options?: ColumnIdOptions) {
    super(name, options);
    let startsFrom = ColumnIdStartsFrom;
    if (options && options.startsFrom) startsFrom = options.startsFrom;
    const lastValue = startsFrom - 1;
    this.identityManager = new NumericIdentityManager(lastValue);
  }

  public getValue(): number {
    return this.identityManager.newValue();
  }
}
