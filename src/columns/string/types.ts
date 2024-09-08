import { ColumnOptions } from "@/types";

/**
 * {@link StringColumn} options.
 * @prop `include` - allows to define which symbols must be included (lowercase/uppercase letter, number, special chars, whitespace). If missing, all symbols could be included.
 * @prop `maxLength` - max length of the string.
 * @prop `minLength` - min length of the string.
 */
export type StringColumnOptions = ColumnOptions & {
  include?: {
    lowercase?: boolean;
    numbers?: boolean;
    special?: boolean;
    uppercase?: boolean;
    whitespace?: boolean;
  };
  maxLength: number;
  minLength?: number;
};
