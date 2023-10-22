import { KeyOf } from "@mantlebee/ts-core";

import { ColumnRelation } from "@/models";
import { ColumnOptions, Row } from "@/types";

export abstract class ColumnRelationNumber<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TOptions extends ColumnOptions = ColumnOptions
> extends ColumnRelation<TSourceRow, TTargetRow, number, TOptions> {
  public constructor(name: KeyOf<TSourceRow>, options?: TOptions) {
    super(name, 0, options);
  }
}

export abstract class ColumnRelationString<
  TSourceRow extends Row,
  TTargetRow extends Row,
  TOptions extends ColumnOptions = ColumnOptions
> extends ColumnRelation<TSourceRow, TTargetRow, string, TOptions> {
  public constructor(name: KeyOf<TSourceRow>, options?: TOptions) {
    super(name, "", options);
  }
}
