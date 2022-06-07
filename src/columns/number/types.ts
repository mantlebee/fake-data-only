import { IFdoColumn } from "@/interfaces";

export type FdoColumnNumberOptions<TItem> = {
  decimals?: number;
  dependencies?: {
    decimals?: IFdoColumn<TItem, number>;
    max?: IFdoColumn<TItem, number>;
    min?: IFdoColumn<TItem, number>;
  };
  max: number;
  min?: number;
};
