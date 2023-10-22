import { extractRandomItem } from "@mantlebee/ts-random";

import { LastNames } from "@/constants";

export function getColumnLastNameValue(): string {
  return extractRandomItem(LastNames);
}
