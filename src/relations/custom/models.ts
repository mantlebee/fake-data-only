import { KeyOf, List } from "@mantlebee/ts-core";

import { ColumnRelation } from "@/models";
import { Dataset, Row } from "@/types";

import { ColumnRelationCustomValueGetter } from "./types";
import { setColumnRelationCustomValues } from "./utils";

export class ColumnRelationCustom<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TValue,
> extends ColumnRelation<TSourceRow, TTargetRow, TValue> {
  private readonly getValueDelegate: ColumnRelationCustomValueGetter<
    TSourceRow,
    TTargetRow,
    TValue
  >;

  public constructor(
    name: KeyOf<TSourceRow>,
    defaultValue: TValue,
    getValueDelegate: ColumnRelationCustomValueGetter<
      TSourceRow,
      TTargetRow,
      TValue
    >
  ) {
    super(name, defaultValue);
    this.getValueDelegate = getValueDelegate;
  }

  public setValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>,
    dataset: Dataset
  ): void {
    const { getValueDelegate, name } = this;
    setColumnRelationCustomValues(
      name,
      getValueDelegate,
      sourceRows,
      targetRows,
      dataset
    );
  }
}
