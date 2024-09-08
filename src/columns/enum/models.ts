import { KeyOf } from "@mantlebee/ts-core";

import { Column } from "@/models";
import { Row } from "@/types";

import { getEnumColumnValue } from "./utils";

/**
 * Extract a random value from the passed enumerative.
 * To pass and enumerative, use the `Object(MyEnum)` syntax.
 */
export class EnumColumn<TRow extends Row, TEnum> extends Column<TRow, TEnum> {
  public readonly enumerative!: TEnum;

  /**
   * @param name Name of the column and of the field.
   * @param enumerative Enumerative, passed using `Object(MyEnum)` syntax.
   */
  public constructor(name: KeyOf<TRow>, enumerative: TEnum) {
    super(name);
    this.enumerative = enumerative;
  }

  public getValue(): TEnum {
    return getEnumColumnValue(this.enumerative);
  }
}
