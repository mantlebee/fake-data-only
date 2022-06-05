import { extractRandomItem } from "@mantlebee/ts-core";

import { FemaleFirstNames, Gender, MaleFirstNames } from "@/constants";

import { FdoColumnFirstNameOptions } from "./types";

export function FdoColumnFirstNameValueDelegate(
  options: FdoColumnFirstNameOptions
): string {
  const { gender = Gender.unspecified } = options;
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
