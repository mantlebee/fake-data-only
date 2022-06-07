import { KeysOf } from "@mantlebee/ts-core";

export type FdoColumnEnumOptions<TEnum> = {
  enumerative: KeysOf<TEnum>;
};
