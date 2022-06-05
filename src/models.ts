import { Any, Dictionary, List } from "@mantlebee/ts-core";

import { IFdoColumn, IFdoGenerator } from "./interfaces";
import { FdoGeneratorGenerateDelegate } from "./utils";

export class FdoGenerator implements IFdoGenerator {
  public generate<T extends Dictionary<Any>>(
    columns: List<IFdoColumn<T, Any>>,
    rowsNumber: number
  ): List<T> {
    return FdoGeneratorGenerateDelegate(columns, rowsNumber);
  }
}
