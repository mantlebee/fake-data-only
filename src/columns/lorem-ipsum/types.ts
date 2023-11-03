import { OptionalKeysOf } from "@mantlebee/ts-core";

import { ColumnOptions } from "@/types";

import { EssayBuilderOptions } from "./essay-builder";

export type ColumnLoremIpsumOptions = ColumnOptions &
  OptionalKeysOf<EssayBuilderOptions>;
