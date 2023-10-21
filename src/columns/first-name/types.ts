import { Gender } from "@/constants";
import { ColumnOptions } from "@/types";

export type ColumnFirstNameOptions = ColumnOptions & {
  gender?: Gender;
};
