import { extractRandomItem } from "@mantlebee/ts-core";

import {
  FdoColumnFirstNameValueDelegate,
  FdoColumnLastNameValueDelegate,
} from "@/columns";
import { FirstLevelDomains, SecondLevelDomains } from "@/constants";

import { FdoColumnEmailOptions } from "./types";

export function FdoColumnEmailValueDelegate<TItem>(
  item: TItem,
  options?: FdoColumnEmailOptions<TItem>
): string {
  let {
    dependencies = {},
    domains = [
      `${extractRandomItem(SecondLevelDomains)}.${extractRandomItem(
        FirstLevelDomains
      )}`,
    ],
  } = { ...options };
  let domain = extractRandomItem(domains);
  let firstName = FdoColumnFirstNameValueDelegate(options);
  let lastName = FdoColumnLastNameValueDelegate();
  if (dependencies.domain)
    domain = (item[dependencies.domain.name] as unknown) as string;
  if (dependencies.firstName)
    firstName = (item[dependencies.firstName.name] as unknown) as string;
  if (dependencies.lastName)
    lastName = (item[dependencies.lastName.name] as unknown) as string;
  const email = `${firstName}.${lastName}@${domain}`;
  return email.toLowercase();
}
