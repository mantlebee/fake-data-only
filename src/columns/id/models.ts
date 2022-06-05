import { KeyOf, NumericIdentityManager } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

import { FdoColumnIdOptions } from "./types";

export class FdoColumnId<TItem> implements IFdoColumn<TItem, number> {
  private readonly identityManager!: NumericIdentityManager;
  public readonly name!: KeyOf<TItem>;
  public readonly options!: FdoColumnIdOptions;

  public constructor(name: KeyOf<TItem>, options: FdoColumnIdOptions = {}) {
    this.name = name;
    this.options = options;
    const { startsFrom = 1 } = options;
    const lastValue = startsFrom - 1;
    this.identityManager = new NumericIdentityManager(lastValue);
  }

  public value(): number {
    return this.identityManager.newValue();
  }
}
