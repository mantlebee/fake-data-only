import { Any, Dictionary, List } from "@mantlebee/ts-core";

import { IColumnRelation, ITable } from "./interfaces";

/**
 * Default column ({@link IColumn}) options.
 * @prop nullable - The column value can be casually `null`.
 */
export type ColumnOptions = { nullable?: boolean };

export type Matrix = List<MatrixRow<Any>>;
export type MatrixRow<TRow extends Row> = {
  table: ITable<TRow>;
  rows: List<TRow>;
};

/**
 * Represents a relation between tables.
 * Its purpose is to update the values of a column ({@link IColumnRelation}) of the source table ({@link ITable}) using the rows of a target table.
 */
export type Relation<TSourceRow extends Row, TTargetRow extends Row> = {
  sourceColumn: IColumnRelation<TSourceRow, TTargetRow>;
  sourceTable: ITable<TSourceRow>;
  targetTable: ITable<TTargetRow>;
};

/**
 * The Row type is only defined to simplified the used of generic type TRow when it is passed between different entities.
 */
export type Row = Dictionary<Any>;
