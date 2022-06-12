import { List } from "@mantlebee/ts-core";

import { FdoMatrix } from "@/types";

export type FdoRelationCustomGetValueDelegate<
  TSourceRow,
  TTargetRow,
  TValue
> = (
  sourceRow: TSourceRow,
  targetRows: List<TTargetRow>,
  matrix: FdoMatrix
) => TValue;
