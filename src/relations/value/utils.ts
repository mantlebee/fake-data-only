import { KeyOf, List } from "@mantlebee/ts-core";
import { extractRandomItems, generateRandomNumber } from "@mantlebee/ts-random";

function createChunks<T>(list: List<T>, size: number): List<List<T>> {
  const chunks: List<List<T>> = [];
  const listClone = [...list];
  while (chunks.length < size) {
    // last run
    if (chunks.length === size - 1) chunks.push(listClone);
    else chunks.push(extractRandomItems(listClone, true));
  }
  return chunks;
}

export function RelationValueSetValuesDelegate<TSourceRow, TTargetRow>(
  sourceColumnName: KeyOf<TSourceRow>,
  sourceRows: List<TSourceRow>,
  targetRows: List<TTargetRow>,
  targetColumnName: KeyOf<TTargetRow>
): void {
  const sourceRowsChunk = createChunks(sourceRows, targetRows.length);
  targetRows.forEach((targetRow, index) => {
    sourceRowsChunk[index].forEach((sourceRow) => {
      sourceRow[sourceColumnName] = (targetRow[
        targetColumnName
      ] as unknown) as TSourceRow[KeyOf<TSourceRow>];
    });
  });
}
