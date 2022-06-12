import { List } from "@mantlebee/ts-core";

export type FdoRelationCustomCondition<TSourceRow, TTargetRow> = (
  sourceRow: TSourceRow,
  targetRows: List<TTargetRow>
) => void;
