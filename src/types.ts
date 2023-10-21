import { Any, Dictionary, List } from "@mantlebee/ts-core";

import { ITable } from "./interfaces";

export type ColumnOptions = { nullable?: boolean };

export type Matrix = List<MatrixRow<Any>>;
export type MatrixRow<TRow extends Row> = {
  table: ITable<TRow>;
  rows: List<TRow>;
};

export type Row = Dictionary<Any>;
