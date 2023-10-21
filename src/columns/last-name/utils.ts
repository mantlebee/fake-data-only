import { extractRandomItem } from "@mantlebee/ts-random";

import { LastNames } from "@/constants";

export function ColumnLastNameGetValueDelegate(): string {
  return extractRandomItem(LastNames);
}
