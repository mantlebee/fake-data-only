import { Any, Dictionary, List, TypedKey } from "@mantlebee/ts-core";

import { ITable } from "./interfaces";

/**
 * Default column ({@link Column}) options.
 * @prop `nullable` - The column value can be casually `null`.
 */
export type ColumnOptions = { nullable?: boolean };

/**
 * Getter of the column options.
 * Options are created every time a column must generate a value.
 */
export type ColumnOptionsGetter<
  TRow extends Row,
  TOptions extends ColumnOptions,
> = (row: TRow, ...args: Any) => TOptions;

/**
 * Define a map of table name (or key) and amount of rows to generate.
 * It is used by {@link Database} to know how many rows to generate for each table.
 */
export type CountsMap = Record<string | symbol, number>;

/**
 * Database ({@link IDatabase}) dataset. It is a dictionary where the key is the table ({@link ITable}) name (or key) and the value the table rows generated.
 * Like the {@link Row} type, this type is defined to simplify return types.
 */
export type Dataset = Record<string | symbol, List<Row>>;

/**
 * The Row type is only defined to simplified the used of generic type TRow when it is passed between different entities.
 */
export type Row = Dictionary<Any>;

export type TableKey<TRow> = symbol &
  TypedKey<TRow> & { readonly description: string };
