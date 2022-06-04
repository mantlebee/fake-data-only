import {
  generateRandomNumber,
  generateRandomString,
  getLowercaseChars,
  getNumberChars,
  getSpecialChars,
  getUppercaseChars,
} from "@mantlebee/ts-core";

import { FdoColumnStringOptions } from "./types";

export function FdoColumnStringValueDelegate(
  options: FdoColumnStringOptions
): string {
  const { maxLength, minLength } = options;
  let length = maxLength;
  if (maxLength !== minLength)
    length = generateRandomNumber(minLength, maxLength);
  let chars: string = "";
  if (options.includeLowerCase) chars += getLowercaseChars();
  if (options.includeNumbers) chars += getNumberChars();
  if (options.includeSpecialChars) chars += getSpecialChars();
  if (options.includeUpperCase) chars += getUppercaseChars();
  return generateRandomString(chars, length);
}
