import { List } from "@mantlebee/ts-core";

import { Data, Row } from "@/types";

export type columnRelationCustomGetValueDelegate<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TValue,
> = (sourceRow: TSourceRow, targetRows: List<TTargetRow>, data: Data) => TValue;
