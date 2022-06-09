import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

import { IFdoColumn, IFdoGenerator } from "./interfaces";
import { FdoGeneratorOptions } from "./types";
import { FdoGeneratorGenerateDelegate } from "./utils";

export abstract class FdoColumn<TItem, TValue, TOptions = Any>
  implements IFdoColumn<TItem, TValue, TOptions> {
  public readonly name!: KeyOf<TItem>;
  public readonly options?: TOptions;

  public constructor(name: KeyOf<TItem>, options?: TOptions) {
    this.name = name;
    this.options = options;
  }

  public abstract value(item: TItem): TValue;
}

export class FdoGenerator implements IFdoGenerator {
  public generate<T extends Dictionary<Any>>(
    columns: List<IFdoColumn<T, Any, any>>,
    rowsNumber: number,
    options?: FdoGeneratorOptions<T>
  ): List<T> {
    return FdoGeneratorGenerateDelegate(columns, rowsNumber, options);
  }
}
