import { List } from "@mantlebee/ts-core";

import { ColumnOptions } from "@/types";

/**
 * {@link ColumnEmail} options.
 * @prop `domains` - List of domains from which to choose one.
 * @prop `firstNames` - List of first names from which to choose one.
 * @prop `lastNames` - List of last names from which to choose one.
 */
export type ColumnEmailOptions = ColumnOptions & {
  domains?: List<string>;
  firstNames?: List<string>;
  lastNames?: List<string>;
};
