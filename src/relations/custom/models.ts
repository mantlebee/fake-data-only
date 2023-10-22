import { KeyOf, List } from "@mantlebee/ts-core";

import { ColumnRelation } from "@/models";
import { Data, Row } from "@/types";

import { ColumnRelationCustomGetValueDelegate } from "./types";
import { ColumnRelationCustomDelegate } from "./utils";

export class ColumnRelationCustom<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TValue
> extends ColumnRelation<TSourceRow, TTargetRow, TValue> {
  private readonly getValueDelegate: ColumnRelationCustomGetValueDelegate<
    TSourceRow,
    TTargetRow,
    TValue
  >;

  public constructor(
    name: KeyOf<TSourceRow>,
    defaultValue: TValue,
    getValueDelegate: ColumnRelationCustomGetValueDelegate<
      TSourceRow,
      TTargetRow,
      TValue
    >
  ) {
    super(name, defaultValue);
    this.getValueDelegate = getValueDelegate;
  }

  public setRelationValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>,
    data: Data
  ): void {
    const { getValueDelegate, name } = this;
    ColumnRelationCustomDelegate(
      name,
      getValueDelegate,
      sourceRows,
      targetRows,
      data
    );
  }
}
