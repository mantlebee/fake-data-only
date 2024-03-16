import { KeyOf, List } from "@mantlebee/ts-core";

import { Relation } from "@/models";
import { Dataset, Row, TableKey } from "@/types";

import { RelationCustomValueGetter } from "./types";
import { setRelationCustomValues } from "./utils";

export class RelationCustom<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TValue,
> extends Relation<TSourceRow, TTargetRow> {
  private readonly getValueDelegate: RelationCustomValueGetter<
    TSourceRow,
    TTargetRow,
    TValue
  >;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTableKey: TableKey<TSourceRow>,
    targetTableKey: TableKey<TTargetRow>,
    getValueDelegate: RelationCustomValueGetter<TSourceRow, TTargetRow, TValue>
  ) {
    super(sourceColumnName, sourceTableKey, targetTableKey);
    this.getValueDelegate = getValueDelegate;
  }

  public setValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>,
    dataset: Dataset
  ): void {
    const { getValueDelegate, sourceColumnName } = this;
    setRelationCustomValues(
      sourceColumnName,
      getValueDelegate,
      sourceRows,
      targetRows,
      dataset
    );
  }
}
