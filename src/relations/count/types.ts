export type FdoRelationCountCondition<TSourceRow, TTargetRow> = (
  sourceRow: TSourceRow,
  targetRow: TTargetRow
) => boolean;
