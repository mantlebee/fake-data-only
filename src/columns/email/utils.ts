import { extractRandomItem } from "@mantlebee/ts-random";

import {
  columnFirstNameGetValueDelegate,
  columnLastNameGetValueDelegate,
} from "@/columns";
import { FirstLevelDomains, SecondLevelDomains } from "@/constants";

import { ColumnEmailOptions } from "./types";

function generateRandomDomain(): string {
  const randomFirstLevel = extractRandomItem(FirstLevelDomains);
  const randomSecondLevel = extractRandomItem(SecondLevelDomains);
  return `${randomSecondLevel}.${randomFirstLevel}`;
}

export function columnEmailGetValueDelegate(
  options?: ColumnEmailOptions,
): string {
  const {
    domains = [generateRandomDomain()],
    firstNames = [columnFirstNameGetValueDelegate()],
    lastNames = [columnLastNameGetValueDelegate()],
  } = { ...options };
  const domain = extractRandomItem(domains);
  const firstName = extractRandomItem(firstNames);
  const lastName = extractRandomItem(lastNames);
  const email = `${firstName}.${lastName}@${domain}`;
  return email.toLowerCase();
}
