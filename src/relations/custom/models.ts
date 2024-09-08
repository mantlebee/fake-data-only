import { Any, KeyOf, List } from "@mantlebee/ts-core";

import { ColumnRelationAbstract } from "@/models";
import {
  ColumnOptions,
  ColumnOptionsGetter,
  Dataset,
  Row,
  TableKey,
} from "@/types";

import { RelationCustomValueGetter } from "./types";
import { setRelationCustomValues } from "./utils";

export class CustomRelationColumn<
  TRow extends Row,
  TTargetRow extends Row,
  TValue = Any,
  TOptions extends ColumnOptions = ColumnOptions,
> extends ColumnRelationAbstract<TRow, TTargetRow, TValue, TOptions> {
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
