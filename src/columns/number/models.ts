import { IFdoColumn } from "@/interfaces";

import { FdoColumnNumberOptions } from "./types";
import { FdoColumnNumberValueDelegate } from "./utils";

export class FdoColumnNumber implements IFdoColumn<number> {
  public readonly name!: string;
  public readonly options!: FdoColumnNumberOptions;

  public constructor(name: string, options: FdoColumnNumberOptions) {
    this.name = name;
    this.options = options;
  }

  public value(): number {
    return FdoColumnNumberValueDelegate(this.options);
  }
}
