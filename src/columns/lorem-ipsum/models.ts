import { List } from "@mantlebee/ts-core";
import { extractRandomItem, generateRandomNumber } from "@mantlebee/ts-random";

// import { Column } from "@/models";
// import { Row } from "@/types";

import { ColumnLoremIpsumOptions } from "./types";

const WORDS = [
  "ad",
  "adipisicing",
  "aliqua",
  "aliquip",
  "amet",
  "anim",
  "aute",
  "cillum",
  "commodo",
  "consectetur",
  "consequat",
  "culpa",
  "cupidatat",
  "deserunt",
  "do",
  "dolor",
  "dolore",
  "duis",
  "ea",
  "eiusmod",
  "elit",
  "enim",
  "esse",
  "est",
  "et",
  "eu",
  "ex",
  "excepteur",
  "exercitation",
  "fugiat",
  "id",
  "in",
  "incididunt",
  "ipsum",
  "irure",
  "labore",
  "laboris",
  "laborum",
  "lorem",
  "magna",
  "minim",
  "mollit",
  "nisi",
  "non",
  "nostrud",
  "nulla",
  "occaecat",
  "officia",
  "pariatur",
  "proident",
  "qui",
  "quis",
  "reprehenderit",
  "sint",
  "sit",
  "sunt",
  "tempor",
  "ullamco",
  "ut",
  "velit",
  "veniam",
  "voluptate",
];

interface IEssayBuilder {
  readonly length: number;
  addWord(word: string): void;
  toString(): string;
}

class EssayBuilderBase implements IEssayBuilder {
  private _length: number;
  private readonly _separator: string;
  protected readonly _chunks: List<string>;

  public constructor(separator: string) {
    this._length = separator.length;
    this._separator = separator;
    this._chunks = [];
  }

  public get length() {
    return this._length - this._separator.length;
  }
  public addWord(word: string) {
    this._length += word.length + this._separator.length;
    this._chunks.push(word);
  }
  public toString(): string {
    return this._chunks.join(this._separator);
  }
}

function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

class SentenceBuilder extends EssayBuilderBase {
  private readonly _wordsCount: number;

  public constructor(wordsCount: number) {
    super(" ");
    this._wordsCount = wordsCount;
  }

  public get complete(): boolean {
    return this._chunks.length === this._wordsCount;
  }

  private get _isFirstWord(): boolean {
    return !this._chunks.length;
  }
  private get _isLastWord(): boolean {
    return this._chunks.length === this._wordsCount - 1;
  }

  public addWord(word: string): void {
    if (this._isFirstWord) word = capitalizeFirstLetter(word);
    else if (this._isLastWord) word += ".";
    super.addWord(word);
  }
}

class ParagraphBuilder extends EssayBuilderBase {
  private _sentenceBuilder: SentenceBuilder;
  private readonly _sentencesCount: number;

  public constructor(sentencesCount: number) {
    super(" ");
    const wordsCount = generateRandomNumber(16, 4);
    this._sentenceBuilder = new SentenceBuilder(wordsCount);
    this._sentencesCount = sentencesCount;
  }

  public get complete(): boolean {
    return this._chunks.length === this._sentencesCount;
  }

  public addWord(word: string): void {
    this._sentenceBuilder.addWord(word);
    if (this._sentenceBuilder.complete) {
      super.addWord(this._sentenceBuilder.toString());
      const wordsCount = generateRandomNumber(16, 4);
      this._sentenceBuilder = new SentenceBuilder(wordsCount);
    }
  }
}

class EssayBuilder extends EssayBuilderBase {
  private _paragraphBuilder: ParagraphBuilder;
  private readonly _paragraphsCount: number;

  public constructor(paragraphsCount: number) {
    super("\n\n");
    const sentencesCount = generateRandomNumber(8, 4);
    this._paragraphBuilder = new ParagraphBuilder(sentencesCount);
    this._paragraphsCount = paragraphsCount;
  }

  public get complete(): boolean {
    return this._chunks.length === this._paragraphsCount;
  }

  public addWord(word: string): void {
    this._paragraphBuilder.addWord(word);
    if (this._paragraphBuilder.complete) {
      super.addWord(this._paragraphBuilder.toString());
      const sentencesCount = generateRandomNumber(8, 4);
      this._paragraphBuilder = new ParagraphBuilder(sentencesCount);
    }
  }
}

export class ColumnLoremIpsum<TRow> {
  public getValue(row: TRow): string {
    // const options = this.getOptions(row);
    const loremBuilder = new EssayBuilder(5);
    do {
      const word = extractRandomItem(WORDS);
      loremBuilder.addWord(word);
    } while (!loremBuilder.complete);
    return loremBuilder.toString();
  }
}
