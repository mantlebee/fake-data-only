import { List } from "@mantlebee/ts-core";

import { Gender } from "@/constants";

export type FdoColumnEmailOptions = {
  gender?: Gender;
  providers?: List<string>;
};
