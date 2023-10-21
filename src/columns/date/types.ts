import { GenerateRandomDateOptions } from "@mantlebee/ts-random";

import { ColumnOptions } from "@/types";

export type ColumnDateOptions = ColumnOptions &
  GenerateRandomDateOptions & {
    dateFrom?: Date;
    dateTo?: Date;
  };
