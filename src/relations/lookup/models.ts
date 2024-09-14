import { Any, KeyOf, List, ValueOrGetter } from "@mantlebee/ts-core";

import { ColumnRelationAbstract } from "@/models";
import { ColumnOptions, TableKey } from "@/types";

import { setRelationLookupValues } from "./utils";

export class LookupRelationColumn<
  TRow,
  TTargetRow,
  TValue = Any,
  TOptions extends ColumnOptions = ColumnOptions,
> extends ColumnRelationAbstract<TRow, TTargetRow, TValue, TOptions> {
  public constructor(
    name: KeyOf<TRow>,
    defaultValue: TValue,
    targetTableKey: TableKey<TTargetRow>,
    protected readonly targetColumnName: KeyOf<TTargetRow>,
    options: ValueOrGetter<TOptions, TRow> = {} as TOptions
  ) {
    super(name, defaultValue, targetTableKey, options);
  }

  public setValues(sourceRows: List<TRow>, targetRows: List<TTargetRow>): void {
    const { name, targetColumnName } = this;
    setRelationLookupValues(name, targetColumnName, sourceRows, targetRows);
  }
}
