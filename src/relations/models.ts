import { KeyOf } from "@mantlebee/ts-core";

import { ColumnRelation } from "@/models";
import { ColumnOptions, GetColumnOptionsDelegate, Row } from "@/types";

export abstract class ColumnRelationNumber<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TOptions extends ColumnOptions = ColumnOptions,
> extends ColumnRelation<TSourceRow, TTargetRow, number, TOptions> {
  public constructor(
    name: KeyOf<TSourceRow>,
    getOptionsDelegate?: GetColumnOptionsDelegate<TSourceRow, TOptions>
  ) {
    super(name, 0, getOptionsDelegate);
  }
}

export abstract class ColumnRelationString<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TOptions extends ColumnOptions = ColumnOptions,
> extends ColumnRelation<TSourceRow, TTargetRow, string, TOptions> {
  public constructor(
    name: KeyOf<TSourceRow>,
    getOptionsDelegate?: GetColumnOptionsDelegate<TSourceRow, TOptions>
  ) {
    super(name, "", getOptionsDelegate);
  }
}
