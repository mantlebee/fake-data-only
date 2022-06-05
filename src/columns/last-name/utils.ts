import { generateRandomNumber } from "@mantlebee/ts-core";

import { LastNames } from "@/constants";

export function FdoColumnLastNameValueDelegate(): string {
  const randomIndex = generateRandomNumber(LastNames.length - 1);
  return LastNames[randomIndex];
}
