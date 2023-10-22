import { KeyOf, List } from "@mantlebee/ts-core";

import { ColumnRelation } from "@/models";
import { Row } from "@/types";

import { setColumnRelationLookupValues } from "./utils";

export class ColumnRelationLookup<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TValue,
> extends ColumnRelation<TSourceRow, TTargetRow, TValue> {
  private readonly targetColumnName: KeyOf<TTargetRow>;

  public constructor(
    name: KeyOf<TSourceRow>,
    defaultValue: TValue,
    targetColumnName: KeyOf<TTargetRow>
  ) {
    super(name, defaultValue);
    this.targetColumnName = targetColumnName;
  }

  public setValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>
  ): void {
    const { name, targetColumnName } = this;
    setColumnRelationLookupValues(
      name,
      targetColumnName,
      sourceRows,
      targetRows
    );
  }
}
