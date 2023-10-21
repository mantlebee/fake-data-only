import { Any, KeyOf, List } from "@mantlebee/ts-core";

import { ITable } from "./interfaces";

export type ColumnOptions = {};

export type Matrix = List<MatrixRow<Any>>;
export type MatrixRow<TRow> = { table: ITable<TRow>; rows: List<TRow> };

export type TableOptions<TRow> = {
  nullables: List<KeyOf<TRow>>;
};
