import { IFdoColumn } from "@/interfaces";

import { FdoColumnStringOptions } from "./types";
import { FdoColumnStringValueDelegate } from "./utils";

export class FdoColumnString implements IFdoColumn<string> {
  public readonly name!: string;
  public readonly options!: FdoColumnStringOptions;

  public constructor(name: string, options: FdoColumnStringOptions) {
    this.name = name;
    this.options = options;
  }

  public value(): string {
    return FdoColumnStringValueDelegate(this.options);
  }
}
