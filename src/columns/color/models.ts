import { IColor } from "@mantlebee/ts-core";
import { generateRandomColor } from "@mantlebee/ts-random";

import { Column } from "@/models";
import { Row } from "@/types";

import { ColumnColorOptions } from "./types";

/**
 * Generates a random `IColor` instance.
 * It is possible restrict the color generation givin a range defined by options `from` and `to`.
 * It is possible to choose if the color can be partially transparent, using the `transparent` option. In this case, the opacity level is generated randomly.
 */
export class ColumnColor<TRow extends Row> extends Column<
  TRow,
  IColor,
  ColumnColorOptions
> {
  public getValue(row: TRow): IColor {
    const { from, to, transparent } = this.getOptionsDelegate(row);
    return generateRandomColor(transparent, from, to);
  }
}
