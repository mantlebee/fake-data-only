import { FdoColumnOptions } from "@/types";

export type FdoColumnNumberOptions = FdoColumnOptions & {
  decimals?: number;
  max: number;
  min?: number;
};
