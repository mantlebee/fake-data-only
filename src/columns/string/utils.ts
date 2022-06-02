import { generateRandomNumber, generateRandomString } from "@mantlebee/ts-core";
import { FdoColumnStringOptions } from "./types";

function getCharsFromCharCode(startIndex: number, length: number): string {
  return Array(length)
    .fill(startIndex)
    .map((item, index) => String.fromCharCode(item + index))
    .join();
}
function getLowerCaseChars(): string {
  return getCharsFromCharCode(97, 26);
}
function getNumberChars(): string {
  return getCharsFromCharCode(48, 10);
}
function getUpperCaseChars(): string {
  return getCharsFromCharCode(65, 26);
}
function getSpecialChars(): string {
  return (
    getCharsFromCharCode(123, 4) +
    getCharsFromCharCode(94, 3) +
    getCharsFromCharCode(58, 7) +
    getCharsFromCharCode(32, 16)
  );
}

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
