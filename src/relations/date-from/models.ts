import { KeyOf, List } from "@mantlebee/ts-core";

import { ColumnRelation } from "@/models";
import { Row, TableKey } from "@/types";

import {
  ColumnRelationDateFromOptions,
  ColumnRelationDateFromOptionsGetter,
  RelationDateFromCondition,
} from "./types";
import { setRelationDateFromValues } from "./utils";

/**
 * Generates a random date, starting from a value of a target row.
 * Use Case: every comment of a post, must have a creation date that follows the creation date of the post.
 * Similar to {@link ColumnDate}, it is possible to restrict the range,
 * specifing a `to` option, to limit the right-range.
 */
export class ColumnRelationDateFrom<
  TRow extends Row,
  TTargetRow extends Row,
> extends ColumnRelation<
  TRow,
  TTargetRow,
  Date,
  ColumnRelationDateFromOptions
> {
  /**
   * @param name Name of the column and of the field.
   * @param targetTableKey Target table's typed-key.
   * @param targetColumnName Target related row column name.
   * @param findTargetRow Delegate to find the target related row.
   * @param getOptions Column options getter.
   */
  public constructor(
    name: KeyOf<TRow>,
    targetTableKey: TableKey<TTargetRow>,
    protected readonly targetColumnName: KeyOf<TTargetRow>,
    protected readonly findTargetRow: RelationDateFromCondition<
      TRow,
      TTargetRow
    >,
    getOptions?: ColumnRelationDateFromOptionsGetter<TRow, TTargetRow>
  ) {
    super(name, new Date(), targetTableKey, getOptions);
  }

  public setValues(sourceRows: List<TRow>, targetRows: List<TTargetRow>): void {
    const { findTargetRow, getOptions, name, targetColumnName } = this;
    setRelationDateFromValues(
      name,
      targetColumnName,
      findTargetRow,
      sourceRows,
      targetRows,
      getOptions
    );
  }
}