import { generateRandomNumber } from "@mantlebee/ts-random";

import { FdoColumnColorOptions } from "./types";

export function FdoColumnColorValueDelegate(
  options?: FdoColumnColorOptions
): string {
  const { includeAlpha } = { ...options };
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
