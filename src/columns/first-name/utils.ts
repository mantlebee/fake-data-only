import { extractRandomItem } from "@mantlebee/ts-random";

import { FemaleFirstNames, Gender, MaleFirstNames } from "@/constants";

import { ColumnFirstNameOptions } from "./types";
import { ColumnFirstNameOptionsDefault } from "./constants";

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
