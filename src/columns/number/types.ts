import { ColumnOptions } from "@/types";

/**
 * {@link ColumnNumber} options.
 * @prop `decimals` - decimals.
 * @prop `max` - max value (included).
 * @prop `min` - min value, default is 0.
 */
export type ColumnNumberOptions = ColumnOptions & {
  decimals?: number;
  max: number;
  min?: number;
};
