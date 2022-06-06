import { List } from "@mantlebee/ts-core";

import { Gender } from "@/constants";
import { IFdoColumn } from "@/interfaces";

export type FdoColumnEmailOptions<TItem> = {
  gender?: Gender;
  dependencies?: {
    domain?: IFdoColumn<TItem, string>;
    firstName?: IFdoColumn<TItem, string>;
    lastName?: IFdoColumn<TItem, string>;
  };
  domains?: List<string>;
};
