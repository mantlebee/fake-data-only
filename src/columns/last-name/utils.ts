import { extractRandomItem } from "@mantlebee/ts-random";

import { LastNames } from "@/constants";

export function FdoColumnLastNameValueDelegate(): string {
  return extractRandomItem(LastNames);
}
