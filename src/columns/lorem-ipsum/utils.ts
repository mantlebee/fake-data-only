import { extractRandomItem } from "@mantlebee/ts-random";

import { LoremIpsumWords, OptionsDefault } from "./constants";
import { EssayBuilder, EssayBuilderOptions } from "./essay-builder";
import { LoremIpsumColumnOptions } from "./types";

export function getLoremIpsumColumnValue(
  options: LoremIpsumColumnOptions
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
