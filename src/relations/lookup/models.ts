import { Any, KeyOf, List } from "@mantlebee/ts-core";

import { ColumnRelation } from "@/models";
import { ColumnOptions, ColumnOptionsGetter, Row, TableKey } from "@/types";

import { setRelationLookupValues } from "./utils";

export class LookupRelationColumn<
  TRow extends Row,
  TTargetRow extends Row,
  TValue = Any,
  TOptions extends ColumnOptions = ColumnOptions,
> extends ColumnRelation<TRow, TTargetRow, TValue, TOptions> {
  public constructor(
    name: KeyOf<TRow>,
    defaultValue: TValue,
    targetTableKey: TableKey<TTargetRow>,
    protected readonly targetColumnName: KeyOf<TTargetRow>,
    getOptions: ColumnOptionsGetter<TRow, TOptions> = () => ({}) as TOptions
  ) {
    super(name, defaultValue, targetTableKey, getOptions);
  }

  public setValues(sourceRows: List<TRow>, targetRows: List<TTargetRow>): void {
    const { name, targetColumnName } = this;
    setRelationLookupValues(name, targetColumnName, sourceRows, targetRows);
  }
}
