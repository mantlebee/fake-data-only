import { List } from "@mantlebee/ts-core";

import { Dataset, Row } from "@/types";

export type ColumnRelationCustomValueGetter<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TValue,
> = (
  sourceRow: TSourceRow,
  targetRows: List<TTargetRow>,
  dataset: Dataset
) => TValue;
