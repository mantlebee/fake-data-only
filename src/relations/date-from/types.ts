import { ColumnDateOption } from "@/columns";
import { ColumnOptions } from "@/types";

/**
 * {@link ColumnRelationDateFrom} options.
 */
export type ColumnRelationDateFromOptions = ColumnOptions & {
  to?: Date | ColumnDateOption;
};

/**
 * {@link ColumnRelationDateFrom} options getter.
 * The second parameter is the target row of the relation.
 */
export type ColumnRelationDateFromOptionsGetter<TSourceRow, TTargetRow> = (
  sourceRow: TSourceRow,
  targetRow: TTargetRow
) => ColumnRelationDateFromOptions;

/**
 * Type of the delegate to find the target row of the relation.
 */
export type RelationDateFromCondition<TSourceRow, TTargetRow> = (
  sourceRow: TSourceRow,
  targetRow: TTargetRow
) => boolean;
