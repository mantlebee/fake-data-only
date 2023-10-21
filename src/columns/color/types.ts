import { IColor } from "@mantlebee/ts-core";

import { ColumnOptions } from "@/types";

export type ColumnColorOptions = ColumnOptions & {
  from?: IColor;
  to?: IColor;
  transparent?: boolean;
};
