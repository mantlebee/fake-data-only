import {
  getLowercaseChars,
  getNumberChars,
  getSpecialChars,
  getUppercaseChars,
} from "@mantlebee/ts-core";
import {
  generateRandomNumber,
  generateRandomStringFromChars,
} from "@mantlebee/ts-random";

import { StringColumnOptions } from "./types";

/**
 * Generates a random string.
 * It is possible to restrict the min and max length, and which symbols must be included.
 * To generate the string, uses the {@link generateRandomStringFromChars} method from the `@mantlebee/ts-random` package.
 * @param options Options to restrict string length and which symbols must be included.
 * @returns a random string.
 */
export function getStringColumnValue(options: StringColumnOptions): string {
  const {
    include = {
      lowercase: true,
      numbers: true,
      special: true,
      uppercase: true,
      whitespace: true,
    },
    maxLength,
    minLength = 0,
  } = options;
  let length = maxLength;
  if (maxLength !== minLength)
    length = generateRandomNumber(minLength, maxLength);
  let chars: string = "";
  if (include.lowercase) chars += getLowercaseChars();
  if (include.numbers) chars += getNumberChars();
  if (include.special) chars += getSpecialChars();
  if (include.uppercase) chars += getUppercaseChars();
  if (include.whitespace) chars += " ";
  return generateRandomStringFromChars(chars, length);
}
