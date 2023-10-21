import { ColumnOptions } from "@/types";

export type ColumnStringOptions = ColumnOptions & {
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
