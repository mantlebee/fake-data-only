import { GenerateRandomDateOptions } from "@mantlebee/ts-random";

export type ColumnDateOptions = GenerateRandomDateOptions & {
  dateFrom?: Date;
  dateTo?: Date;
};
