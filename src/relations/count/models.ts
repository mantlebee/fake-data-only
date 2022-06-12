import { FdoRelation } from "@/models";
import { FdoMatrixResult } from "@/types";

export class FdoRelationCount<TSourceRow, TTargetRow> extends FdoRelation<
  TSourceRow,
  TTargetRow
> {
  public setValues<TTablesMap>(
    matrixResult: FdoMatrixResult<TTablesMap>
  ): void {
    // const { sourceColumnName, sourceTable, tagetTable } = this;
  }
}
