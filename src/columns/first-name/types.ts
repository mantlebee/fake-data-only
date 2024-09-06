import { Gender } from "@/constants";
import { ColumnOptions } from "@/types";

/**
 * {@link ColumnFirstName} options.
 * @prop `gender` - to specify a gender, or not.
 */
export type ColumnFirstNameOptions = ColumnOptions & {
  gender?: Gender;
};
