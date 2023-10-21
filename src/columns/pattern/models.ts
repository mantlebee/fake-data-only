import { KeyOf } from "@mantlebee/ts-core";
import { generateRandomStringFromPattern } from "@mantlebee/ts-random";

import { Column } from "@/models";
import { Row } from "@/types";

export class ColumnPattern<TRow extends Row> extends Column<TRow, string> {
  public readonly pattern!: string;

  public constructor(name: KeyOf<TRow>, enumerative: string) {
    super(name);
    this.pattern = enumerative;
  }

  public getValue(): string {
    return generateRandomStringFromPattern(this.pattern);
  }
}
