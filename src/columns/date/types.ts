import { GenerateRandomDateOptions } from "@mantlebee/ts-core";

export type FdoColumnDateOptions = GenerateRandomDateOptions & {
  dateFrom?: Date;
  dateTo?: Date;
};
