import { KeyOf, List } from "@mantlebee/ts-core";

import { Row } from "@/types";

import { ColumnRelationNumber } from "../models";
import { ColumnRelationCountCondition } from "./types";
import { ColumnRelationCountDelegate } from "./utils";

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

  public setRelationValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>,
  ): void {
    const { countConditionDelegate, name } = this;
    ColumnRelationCountDelegate(
      name,
      countConditionDelegate,
      sourceRows,
      targetRows,
    );
  }
}
