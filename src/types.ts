import { KeyOf, List } from "@mantlebee/ts-core";

export type FdoColumnOptions = {};

export type FdoTableOptions<TRow> = {
  nullables: List<KeyOf<TRow>>;
};
