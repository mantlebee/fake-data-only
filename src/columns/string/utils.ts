import {
  getLowercaseChars,
  getNumberChars,
  getSpecialChars,
  getUppercaseChars,
} from "@mantlebee/ts-core";
import {
  generateRandomNumber,
  generateRandomString,
} from "@mantlebee/ts-random";

import { FdoColumnStringOptions } from "./types";

export function FdoColumnStringValueDelegate(
  options: FdoColumnStringOptions
): string {
  const {
    includeLowercase = true,
    includeNumbers = true,
    includeSpecialChars = true,
    includeUppercase = true,
    maxLength,
    minLength = 0,
  } = options;
  let length = maxLength;
  if (maxLength !== minLength)
    length = generateRandomNumber(minLength, maxLength);
  let chars: string = "";
  if (includeLowercase) chars += getLowercaseChars();
  if (includeNumbers) chars += getNumberChars();
  if (includeSpecialChars) chars += getSpecialChars();
  if (includeUppercase) chars += getUppercaseChars();
  return generateRandomString(chars, length);
}
