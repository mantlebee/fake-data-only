export interface IFdoColumn<TValue> {
  readonly name: string;
  value(): TValue;
}
