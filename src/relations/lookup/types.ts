import { ITable } from "@/interfaces";

/**
 * Defines the target row details.
 */
export type TargetRowInfo<TTargetRow> = {
  /**
   * The target row label, generated through the table's {@link getRowLabel} method.
   */
  label: string;
  row: TTargetRow;
  table: ITable<TTargetRow>;
};