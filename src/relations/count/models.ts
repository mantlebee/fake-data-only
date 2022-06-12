import { FdoRelation } from "@/models";
import { FdoMatrix } from "@/types";

export class FdoRelationCount<TSourceRow, TTargetRow> extends FdoRelation<
  TSourceRow,
  TTargetRow
> {
  public setValues(matrix: FdoMatrix): void {
    // const { sourceColumnName, sourceTable, tagetTable } = this;
  }
}
