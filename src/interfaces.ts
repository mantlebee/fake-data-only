import { Any, Dictionary, KeyOf, List } from "@mantlebee/ts-core";

export interface IFdoColumn<TItem, TValue, TOptions = Any> {
  readonly name: KeyOf<TItem>;
  readonly options?: TOptions;
  value(item: TItem): TValue;
}

export interface IFdoGenerator {
  generate<T extends Dictionary<Any>>(
    columns: List<IFdoColumn<T, Any, Any>>,
    rowsNumber: number
  ): List<T>;
}
