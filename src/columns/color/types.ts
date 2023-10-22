import { IColor } from "@mantlebee/ts-core";

import { ColumnOptions } from "@/types";

/**
 * {@link ColumnColor} options.
 * @prop `from` - Begin of a range color. Default is `black`.
 * @prop `to` - End of a range color. Default is `white`.
 * @prop `transparent` - Defines if the color generated should be opaque or have a opacity level.
 */
export type ColumnColorOptions = ColumnOptions & {
  from?: IColor;
  to?: IColor;
  transparent?: boolean;
};
