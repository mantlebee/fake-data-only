import { ITable } from "@/interfaces";
import { Table } from "@/models";

import { adaptRowsValues } from "./utils";

export class Sqlite3Table<TRow> extends Table<TRow> {
  public seed(rowsCount: number): ITable<TRow> {
    const rows = super.seed(rowsCount).getRows();
    adaptRowsValues(rows, this.columns);
    return this;
  }
}
