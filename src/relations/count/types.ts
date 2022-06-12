export type FdoRelationCountCoundition<TSourceRow, TTargetRow> = (
  sourceRow: TSourceRow,
  targetRow: TTargetRow
) => boolean;
