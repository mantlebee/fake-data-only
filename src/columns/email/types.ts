import { List } from "@mantlebee/ts-core";

import { ColumnOptions } from "@/types";

export type ColumnEmailOptions = ColumnOptions & {
  domains?: List<string>;
  firstNames?: List<string>;
  lastNames?: List<string>;
};
