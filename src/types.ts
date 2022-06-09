import { KeyOf, List } from "@mantlebee/ts-core";

export type FdoColumnOptions = {};

export type FdoGeneratorOptions<T> = {
  nullables: List<KeyOf<T>>;
};
