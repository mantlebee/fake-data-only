import {
  generateRandomNumber,
  generateRandomString,
  getLowerCaseChars,
  getNumberChars,
  getSpecialChars,
  getUpperCaseChars,
} from "@mantlebee/ts-core";

import { FdoColumnStringOptions } from "./types";

export function FdoColumnStringValueDelegate(
  options: FdoColumnStringOptions
): string {
  const length = generateRandomNumber(options.minLength, options.maxLength);
  let chars: string = "";
  if (options.includeLowerCase) chars += getLowerCaseChars();
  if (options.includeNumbers) chars += getNumberChars();
  if (options.includeSpecialChars) chars += getSpecialChars();
  if (options.includeUpperCase) chars += getUpperCaseChars();
  return generateRandomString(chars, length);
}
