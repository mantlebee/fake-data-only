export interface IEssayBuilder {
  readonly length: number;
  addWord(word: string): void;
  toString(): string;
}
