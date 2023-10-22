import { extractRandomItem } from "@mantlebee/ts-random";

import { LastNames } from "@/constants";

export function columnLastNameGetValueDelegate(): string {
  return extractRandomItem(LastNames);
}
