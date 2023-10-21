import { List } from "@mantlebee/ts-core";

import { Matrix } from "@/types";

export type RelationCustomGetValueDelegate<
  TSourceRow,
  TTargetRow,
  TValue
> = (
  sourceRow: TSourceRow,
  targetRows: List<TTargetRow>,
  matrix: Matrix
) => TValue;
