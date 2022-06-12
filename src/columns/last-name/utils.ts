import { extractRandomItem } from "@mantlebee/ts-random";

import { LastNames } from "@/constants";

export function FdoColumnLastNameGetValueDelegate(): string {
  return extractRandomItem(LastNames);
}
