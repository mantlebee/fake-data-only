import { GenerateRandomDateOptions } from "@mantlebee/ts-core";

import { IFdoColumn } from "@/interfaces";

export type FdoColumnDateOptions<TItem> = GenerateRandomDateOptions & {
  dateFrom?: Date;
  dateTo?: Date;
  dependencies?: {
    [key in keyof GenerateRandomDateOptions]: IFdoColumn<TItem, number>;
  } & {
    dateFrom?: IFdoColumn<TItem, Date>;
    dateTo?: IFdoColumn<TItem, Date>;
  };
};
