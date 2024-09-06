import { extractRandomItem } from "@mantlebee/ts-random";

export function getColumnEnumValue<TEnum>(enumerative: TEnum): TEnum {
  const keysAndValues = Object.keys(Object(enumerative));
  const keys = keysAndValues.splice(keysAndValues.length / 2);
  const randomKey = extractRandomItem(keys);
  return enumerative[randomKey as keyof TEnum] as unknown as TEnum;
}
