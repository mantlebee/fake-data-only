import { KeyOf, NumericIdentityManager } from "@mantlebee/ts-core";

import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnIdStartsFrom } from "./constants";

export class ColumnId<TRow extends Row> extends Column<TRow, number> {
  private readonly identityManager!: NumericIdentityManager;

  public constructor(
    name: KeyOf<TRow>,
    startsFrom: number = ColumnIdStartsFrom
  ) {
    super(name);
    const lastValue = startsFrom - 1;
    this.identityManager = new NumericIdentityManager(lastValue);
  }

  public getValue(): number {
    return this.identityManager.newValue();
  }
}
