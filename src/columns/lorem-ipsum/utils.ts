import { extractRandomItem } from "@mantlebee/ts-random";

import { LoremIpsumWords, OptionsDefault } from "./constants";
import { EssayBuilder, EssayBuilderOptions } from "./essay-builder";
import { ColumnLoremIpsumOptions } from "./types";

export function getColumnLoremIpsumValue(
  options: ColumnLoremIpsumOptions
): string {
  const essayBuilderOptions: EssayBuilderOptions = {
    ...OptionsDefault,
    ...options,
  };
  const loremBuilder = new EssayBuilder(essayBuilderOptions);
  do {
    const word = extractRandomItem(LoremIpsumWords);
    loremBuilder.addWord(word);
  } while (!loremBuilder.complete);
  return loremBuilder.toString();
}
