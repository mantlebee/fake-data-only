import { Any, KeyOf, List } from "@mantlebee/ts-core";

import { IFdoTable } from "./interfaces";

export type FdoColumnOptions = {};

export type FdoMatrix = List<FdoMatrixRow<Any>>;
export type FdoMatrixRow<TRow> = { table: IFdoTable<TRow>; rows: List<TRow> };

export type FdoTableOptions<TRow> = {
  nullables: List<KeyOf<TRow>>;
};
