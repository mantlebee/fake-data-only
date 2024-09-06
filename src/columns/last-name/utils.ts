import { extractRandomItem } from "@mantlebee/ts-random";

import { LastNames } from "@/constants";

/**
 * Generates a random american last name.
 */
export function getColumnLastNameValue(): string {
  return extractRandomItem(LastNames);
}
