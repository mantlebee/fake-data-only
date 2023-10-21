import { ColumnOptions } from "@/types";

export type ColumnNumberOptions = ColumnOptions & {
  decimals?: number;
  max: number;
  min?: number;
};
