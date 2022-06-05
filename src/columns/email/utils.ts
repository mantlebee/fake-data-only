import { extractRandomItem } from "@mantlebee/ts-core";

import {
  FdoColumnFirstNameValueDelegate,
  FdoColumnLastNameValueDelegate,
} from "@/columns";
import { FirstLevelDomains } from "@/constants";

import { FdoColumnEmailOptions } from "./types";
import { EmailProvidersDefaults } from "./constants";

export function FdoColumnEmailValueDelegate(
  options: FdoColumnEmailOptions
): string {
  const { providers = EmailProvidersDefaults } = options;
  const domain = extractRandomItem(FirstLevelDomains);
  const firstName = FdoColumnFirstNameValueDelegate(options);
  const lastName = FdoColumnLastNameValueDelegate();
  const provider = extractRandomItem(providers);
  const email = `${firstName}.${lastName}@${provider}.${domain}`;
  return email.toLowerCase();
}
