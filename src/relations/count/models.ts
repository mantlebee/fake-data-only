import { KeyOf, List } from "@mantlebee/ts-core";

import { Row } from "@/types";

import { ColumnRelationNumber } from "../models";
import { ColumnRelationCountCondition } from "./types";
import { setColumnRelationCountValues } from "./utils";

export class ColumnRelationCount<
  TSourceRow extends Row,
  TTargetRow extends Row,
> extends ColumnRelationNumber<TSourceRow, TTargetRow> {
  private readonly countCondition: ColumnRelationCountCondition<
    TSourceRow,
    TTargetRow
  >;

  public constructor(
    name: KeyOf<TSourceRow>,
    countCondition: ColumnRelationCountCondition<TSourceRow, TTargetRow>
  ) {
    super(name);
    this.countCondition = countCondition;
  }

  public setValues(
    sourceRows: List<TSourceRow>,
    targetRows: List<TTargetRow>
  ): void {
    const { countCondition, name } = this;
    setColumnRelationCountValues(name, countCondition, sourceRows, targetRows);
  }
}
