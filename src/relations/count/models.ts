import { KeyOf, List } from "@mantlebee/ts-core";

import { Row } from "@/types";

import { ColumnRelationNumber } from "../models";
import { ColumnRelationCountCondition } from "./types";
import { columnRelationCountSetValuesDelegate } from "./utils";

export class ColumnRelationCount<
  TSourceRow extends Row,
  TTargetRow extends Row,
> extends ColumnRelationNumber<TSourceRow, TTargetRow> {
  private readonly countConditionDelegate: ColumnRelationCountCondition<
    TSourceRow,
    TTargetRow
  >;

  public constructor(
    name: KeyOf<TSourceRow>,
    countConditionDelegate: ColumnRelationCountCondition<
      TSourceRow,
      TTargetRow
    >,
  ) {
    super(name);
    this.countConditionDelegate = countConditionDelegate;
  }

  public setValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>,
  ): void {
    const { countConditionDelegate, name } = this;
    columnRelationCountSetValuesDelegate(
      name,
      countConditionDelegate,
      sourceRows,
      targetRows,
    );
  }
}
