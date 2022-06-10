import { GenerateRandomDateOptions } from "@mantlebee/ts-random";

export type FdoColumnDateOptions = GenerateRandomDateOptions & {
  dateFrom?: Date;
  dateTo?: Date;
};
