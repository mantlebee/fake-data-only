import { KeyOf, List } from "@mantlebee/ts-core";

import { Relation, Table } from "@/models";
import { Row } from "@/types";

import { setRelationLookupValues } from "./utils";

export class RelationLookup<
  TSourceRow extends Row,
  TTargetRow extends Row,
> extends Relation<TSourceRow, TTargetRow> {
  private readonly targetColumnName: KeyOf<TTargetRow>;

  public constructor(
    sourceColumnName: KeyOf<TSourceRow>,
    sourceTable: Table<TSourceRow>,
    targetTable: Table<TTargetRow>,
    targetColumnName: KeyOf<TTargetRow>
  ) {
    super(sourceColumnName, sourceTable, targetTable);
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
