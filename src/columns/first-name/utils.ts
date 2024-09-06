import { extractRandomItem } from "@mantlebee/ts-random";

import { FemaleFirstNames, Gender, MaleFirstNames } from "@/constants";

import { ColumnFirstNameOptions } from "./types";
import { ColumnFirstNameOptionsDefault } from "./constants";

/**
 * Generates a random male or female american first name.
 * It is possible to restrict the gender of the name to generate, using the options.
 * @param options Options to restrict the gender of the name, or not.
 * @returns a random male or female american first name.
 */
export function getColumnFirstNameValue(
  options?: ColumnFirstNameOptions
): string {
  const { gender } = { ...ColumnFirstNameOptionsDefault, ...options };
  switch (gender) {
    case Gender.female:
      return extractRandomItem(FemaleFirstNames);
    case Gender.male:
      return extractRandomItem(MaleFirstNames);
    case Gender.unspecified:
    default:
      const firstNames = extractRandomItem([MaleFirstNames, FemaleFirstNames]);
      return extractRandomItem(firstNames);
  }
}
