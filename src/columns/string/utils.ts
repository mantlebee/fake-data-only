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

import { ColumnStringOptions } from "./types";

export function columnStringGetValueDelegate(
  options: ColumnStringOptions,
): string {
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
