import { KeyOf, List } from "@mantlebee/ts-core";
import { IFdoTable } from "./interfaces";

export type FdoColumnOptions = {};

export type FdoMatrixTable<TRow> = {
  rowsNumber: number;
  table: IFdoTable<TRow>;
};

export type FdoTableOptions<TRow> = {
  nullables: List<KeyOf<TRow>>;
};
