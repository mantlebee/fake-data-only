import { generateRandomBoolean } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

export class FdoColumnNumber implements IFdoColumn<boolean> {
  public readonly name!: string;

  public constructor(name: string) {
    this.name = name;
  }

  public value(): boolean {
    return generateRandomBoolean();
  }
}
