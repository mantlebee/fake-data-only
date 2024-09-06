import { Any, KeyOf, List } from "@mantlebee/ts-core";

import { ColumnRelation, Relation } from "@/models";
import {
  ColumnOptions,
  ColumnOptionsGetter,
  Dataset,
  Row,
  TableKey,
} from "@/types";

import { RelationCustomValueGetter } from "./types";
import { setRelationCustomValues } from "./utils";

export class ColumnRelationCustom<
  TRow extends Row,
  TTargetRow extends Row,
  TValue = Any,
  TOptions extends ColumnOptions = ColumnOptions,
> extends ColumnRelation<TRow, TTargetRow, TValue, TOptions> {
  public constructor(
    name: KeyOf<TRow>,
    defaultValue: TValue,
    targetTableKey: TableKey<TTargetRow>,
    protected readonly getValueDelegate: RelationCustomValueGetter<
      TRow,
      TTargetRow,
      TValue
    >,
    getOptions: ColumnOptionsGetter<TRow, TOptions> = () => ({}) as TOptions
  ) {
    super(name, defaultValue, targetTableKey, getOptions);
  }

  public setValues(
    sourceRows: List<TRow>,
    targetRows: List<TTargetRow>,
    dataset: Dataset
  ): void {
    const { getValueDelegate, name } = this;
    setRelationCustomValues(
      name,
      getValueDelegate,
      sourceRows,
      targetRows,
      dataset
    );
  }
}

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
