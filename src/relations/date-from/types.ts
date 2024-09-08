import { ColumnDateOption } from "@/columns";
import { ColumnOptions } from "@/types";

export type ColumnRelationDateFromOptions = ColumnOptions & {
  to?: Date | ColumnDateOption;
};

export type ColumnRelationDateFromOptionsGetter<TSourceRow, TTargetRow> = (
  sourceRow: TSourceRow,
  targetRow: TTargetRow
) => ColumnRelationDateFromOptions;

export type RelationDateFromCondition<TSourceRow, TTargetRow> = (
  sourceRow: TSourceRow,
  targetRow: TTargetRow
) => boolean;
