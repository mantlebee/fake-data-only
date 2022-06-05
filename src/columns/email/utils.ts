import { extractRandomItem } from "@mantlebee/ts-core";

import {
  FdoColumnFirstNameValueDelegate,
  FdoColumnLastNameValueDelegate,
} from "@/columns";
import { FirstLevelDomains } from "@/constants";

import { FdoColumnEmailDependencies, FdoColumnEmailOptions } from "./types";
import { EmailProvidersDefaults } from "./constants";

export function FdoColumnEmailValueDelegate<TItem>(
  item: TItem,
  options: FdoColumnEmailOptions,
  dependencies: FdoColumnEmailDependencies<TItem>
): string {
  const { providers = EmailProvidersDefaults } = options;
  let domain = extractRandomItem(FirstLevelDomains);
  let firstName = FdoColumnFirstNameValueDelegate(options);
  let lastName = FdoColumnLastNameValueDelegate();
  let provider = extractRandomItem(providers);
  if (dependencies.domain)
    domain = (item[dependencies.domain.name] as unknown) as string;
  if (dependencies.firstName)
    firstName = (item[dependencies.firstName.name] as unknown) as string;
  if (dependencies.lastName)
    lastName = (item[dependencies.lastName.name] as unknown) as string;
  if (dependencies.provider)
    provider = (item[dependencies.provider.name] as unknown) as string;
  const email = `${firstName}.${lastName}@${provider}.${domain}`;
  return email.toLowerCase();
}
