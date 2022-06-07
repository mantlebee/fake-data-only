import { generateRandomNumber } from "@mantlebee/ts-core";
import { FdoColumnEnumOptions } from "./types";

export function FdoColumnEnumValueDelegate<TEnum>(
  options: FdoColumnEnumOptions<TEnum>
): TEnum {
  const { enumerative } = options;
  const keys = Object.values(enumerative);
  const randomKey = keys[generateRandomNumber(keys.length / 2)];
  return (enumerative[randomKey as keyof TEnum] as unknown) as TEnum;
}
