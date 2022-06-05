import { generateRandomNumber, List } from "@mantlebee/ts-core";

import { FemaleFirstNames, Gender, MaleFirstNames } from "@/constants";

import { FdoColumnFirstNameOptions } from "./types";

function getRandomFirstName(firstNames: List<string>): string {
  const randomIndex = generateRandomNumber(firstNames.length - 1);
  return firstNames[randomIndex];
}

export function FdoColumnFirstNameValueDelegate(
  options: FdoColumnFirstNameOptions
): string {
  const { gender = Gender.unspecified } = options;
  switch (gender) {
    case Gender.female:
      return getRandomFirstName(FemaleFirstNames);
    case Gender.male:
      return getRandomFirstName(MaleFirstNames);
    case Gender.unspecified:
    default:
      const randomIndex = generateRandomNumber(1);
      const firstNames = [MaleFirstNames, FemaleFirstNames][randomIndex];
      return getRandomFirstName(firstNames);
  }
}
