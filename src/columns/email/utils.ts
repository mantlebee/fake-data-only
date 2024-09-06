import { extractRandomItem } from "@mantlebee/ts-random";

import { getColumnFirstNameValue, getColumnLastNameValue } from "@/columns";
import { FirstLevelDomains, SecondLevelDomains } from "@/constants";

import { ColumnEmailOptions } from "./types";

/**
 * Generates a random email two-levels domain, e.g. "outlook.com".
 * @returns a random email two-levels domain.
 */
function generateRandomDomain(): string {
  const randomFirstLevel = extractRandomItem(FirstLevelDomains);
  const randomSecondLevel = extractRandomItem(SecondLevelDomains);
  return `${randomSecondLevel}.${randomFirstLevel}`;
}

/**
 * Generates a random email with first name, last name and two-levels domain, e.g. "john.doe@outlook.com".
 * It is possible to restrict the choice of these three parameters, using the options.
 * @param options Options to restrict the choice of the parameters first name, last name and domain.
 * @returns a random email formatted "[first-name].[last-name]@[domain]".
 */
export function getColumnEmailValue(options?: ColumnEmailOptions): string {
  const {
    domains = [generateRandomDomain()],
    firstNames = [getColumnFirstNameValue()],
    lastNames = [getColumnLastNameValue()],
  } = { ...options };
  const domain = extractRandomItem(domains);
  const firstName = extractRandomItem(firstNames);
  const lastName = extractRandomItem(lastNames);
  const email = `${firstName}.${lastName}@${domain}`;
  return email.toLowerCase();
}
