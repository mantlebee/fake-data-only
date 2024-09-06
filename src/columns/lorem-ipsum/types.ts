import { ColumnOptions } from "@/types";

export type ColumnLoremIpsumOptions = ColumnOptions & {
  maxLength: number;
  minLength?: number;
};
