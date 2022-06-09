import { extractRandomItem } from "@mantlebee/ts-core";

import { FemaleFirstNames, Gender, MaleFirstNames } from "@/constants";

import { FdoColumnFirstNameOptions } from "./types";
import { FdoColumnFirstNameOptionsDefault } from "./constants";

export function FdoColumnFirstNameValueDelegate(
  options?: FdoColumnFirstNameOptions
): string {
  const { gender } = { ...FdoColumnFirstNameOptionsDefault, ...options };
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
