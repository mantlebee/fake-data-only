import { extractRandomItem } from "@mantlebee/ts-core";
import { FdoColumnEnumOptions } from "./types";

export function FdoColumnEnumValueDelegate<TEnum>(
  options: FdoColumnEnumOptions<TEnum>
): TEnum {
  const { enumerative } = options;
  const keysAndValues = Object.keys(enumerative);
  const keys = keysAndValues.splice(keysAndValues.length / 2);
  const randomKey = extractRandomItem(keys);
  return (enumerative[randomKey as keyof TEnum] as unknown) as TEnum;
}
