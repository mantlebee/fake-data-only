import { extractRandomItem } from "@mantlebee/ts-core";

import { LastNames } from "@/constants";

export function FdoColumnLastNameValueDelegate(): string {
  return extractRandomItem(LastNames);
}
