import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

export interface IFdoColumn<TItem, TValue> {
  readonly name: KeyOf<TItem>;
  value(item: TItem): TValue;
}

export interface IFdoGenerator {
  generate<T extends Dictionary<Any>>(
    columns: List<IFdoColumn<T, Any>>,
    rowsNumber: number
  ): List<T>;
}
