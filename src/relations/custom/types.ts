import { List } from "@mantlebee/ts-core";

import { Data } from "@/types";

export type RelationCustomGetValueDelegate<
  TSourceRow,
  TTargetRow,
  TValue
> = (
  sourceRow: TSourceRow,
  targetRows: List<TTargetRow>,
  matrix: Data
) => TValue;
