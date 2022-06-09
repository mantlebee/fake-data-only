import {
  generateRandomNumber,
  generateRandomString,
  getLowercaseChars,
  getNumberChars,
  getSpecialChars,
  getUppercaseChars,
} from "@mantlebee/ts-core";
import { FdoColumnStringOptionsDefault } from "./constants";

import { FdoColumnStringOptions } from "./types";

export function FdoColumnStringValueDelegate(
  options?: FdoColumnStringOptions
): string {
  const {
    includeLowerCase,
    includeNumbers,
    includeSpecialChars,
    includeUpperCase,
    maxLength,
    minLength,
  } = { ...FdoColumnStringOptionsDefault, ...options };
  let length = maxLength;
  if (maxLength !== minLength)
    length = generateRandomNumber(minLength, maxLength);
  let chars: string = "";
  if (includeLowerCase) chars += getLowercaseChars();
  if (includeNumbers) chars += getNumberChars();
  if (includeSpecialChars) chars += getSpecialChars();
  if (includeUpperCase) chars += getUppercaseChars();
  return generateRandomString(chars, length);
}
