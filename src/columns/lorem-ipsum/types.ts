import { OptionalKeysOf } from "@mantlebee/ts-core";

import { EssayBuilderOptions } from "@/builders";
import { ColumnOptions } from "@/types";

export type LoremIpsumColumnOptions = ColumnOptions &
  OptionalKeysOf<EssayBuilderOptions>;
