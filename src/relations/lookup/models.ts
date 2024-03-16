import { KeyOf, List } from "@mantlebee/ts-core";

import { Relation } from "@/models";
import { Row, TableKey } from "@/types";

import { setRelationLookupValues } from "./utils";

export class RelationLookup<
  TSourceRow extends Row,
  TTargetRow extends Row,
> extends Relation<TSourceRow, TTargetRow> {
  private readonly targetColumnName: KeyOf<TTargetRow>;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTableKey: TableKey<TSourceRow>,
    targetTableKey: TableKey<TTargetRow>,
    targetColumnName: KeyOf<TTargetRow>
  ) {
    super(sourceColumnName, sourceTableKey, targetTableKey);
    this.targetColumnName = targetColumnName;
  }

  public setValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>
  ): void {
    const { sourceColumnName, targetColumnName } = this;
    setRelationLookupValues(
      sourceColumnName,
      targetColumnName,
      sourceRows,
      targetRows
    );
  }
}
