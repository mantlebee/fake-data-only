import { KeyOf, List } from "@mantlebee/ts-core";

import { ColumnRelation } from "@/models";
import { Dataset, Row } from "@/types";

import { columnRelationCustomGetValueDelegate } from "./types";
import { columnRelationCustomSetValuesDelegate } from "./utils";

export class ColumnRelationCustom<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TValue,
> extends ColumnRelation<TSourceRow, TTargetRow, TValue> {
  private readonly getValueDelegate: columnRelationCustomGetValueDelegate<
    TSourceRow,
    TTargetRow,
    TValue
  >;

  public constructor(
    name: KeyOf<TSourceRow>,
    defaultValue: TValue,
    getValueDelegate: columnRelationCustomGetValueDelegate<
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
    columnRelationCustomSetValuesDelegate(
      name,
      getValueDelegate,
      sourceRows,
      targetRows,
      dataset
    );
  }
}
