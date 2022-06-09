import { generateRandomNumber } from "@mantlebee/ts-core";
import { FdoColumnColorOptionsDefault } from "./constants";

import { FdoColumnColorOptions } from "./types";

export function FdoColumnColorValueDelegate(
  options?: FdoColumnColorOptions
): string {
  const { includeAlpha } = { ...FdoColumnColorOptionsDefault, ...options };
  let alpha = 255;
  const blue = generateRandomNumber(255);
  const green = generateRandomNumber(255);
  const red = generateRandomNumber(255);
  if (includeAlpha) {
    alpha = generateRandomNumber(1, 0, 2);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
  return `rgb(${red}, ${green}, ${blue})`;
}
