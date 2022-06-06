import { List } from "@mantlebee/ts-core";

import { Gender } from "@/constants";
import { IFdoColumn } from "@/interfaces";

export type FdoColumnEmailDependencies<TItem> = {
  domain?: IFdoColumn<TItem, string>;
  firstName?: IFdoColumn<TItem, string>;
  lastName?: IFdoColumn<TItem, string>;
};

export type FdoColumnEmailOptions = {
  gender?: Gender;
  domains?: List<string>;
};
