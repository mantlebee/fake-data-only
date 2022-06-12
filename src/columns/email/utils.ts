import { extractRandomItem } from "@mantlebee/ts-random";

import {
  FdoColumnFirstNameGetValueDelegate,
  FdoColumnLastNameGetValueDelegate,
} from "@/columns";
import { FirstLevelDomains, SecondLevelDomains } from "@/constants";

import { FdoColumnEmailOptions } from "./types";

function generateRandomDomain(): string {
  const randomFirstLevel = extractRandomItem(FirstLevelDomains);
  const randomSecondLevel = extractRandomItem(SecondLevelDomains);
  return `${randomSecondLevel}.${randomFirstLevel}`;
}

export function FdoColumnEmailGetValueDelegate(
  options?: FdoColumnEmailOptions
): string {
  const {
    domains = [generateRandomDomain()],
    firstNames = [FdoColumnFirstNameGetValueDelegate()],
    lastNames = [FdoColumnLastNameGetValueDelegate()],
  } = { ...options };
  const domain = extractRandomItem(domains);
  const firstName = extractRandomItem(firstNames);
  const lastName = extractRandomItem(lastNames);
  const email = `${firstName}.${lastName}@${domain}`;
  return email.toLowerCase();
}
