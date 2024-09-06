import { List } from "@mantlebee/ts-core";
import { generateRandomNumber } from "@mantlebee/ts-random";

import { IEssayBuilder } from "./interfaces";
import { EssayBuilderOptions } from "./types";
import { capitalizeFirstLetter } from "./utils";

class EssayBuilderBase implements IEssayBuilder {
  private _length: number;
  private readonly _separator: string;
  protected readonly _chunks: List<string>;
  protected readonly _options: EssayBuilderOptions;

  public constructor(separator: string, options: EssayBuilderOptions) {
    this._length = separator.length;
    this._separator = separator;
    this._chunks = [];
    this._options = options;
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

class SentenceBuilder extends EssayBuilderBase {
  private readonly _wordsCount: number;

  public constructor(options: EssayBuilderOptions) {
    super(" ", options);
    const { max, min } = options.wordsPerSentence;
    this._wordsCount = generateRandomNumber(max, min);
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

  public constructor(options: EssayBuilderOptions) {
    super(" ", options);
    this._sentenceBuilder = new SentenceBuilder(options);
    const { max, min } = this._options.sentencesPerParagraph;
    this._sentencesCount = generateRandomNumber(max, min);
  }

  public get complete(): boolean {
    return this._chunks.length === this._sentencesCount;
  }

  public addWord(word: string): void {
    this._sentenceBuilder.addWord(word);
    if (this._sentenceBuilder.complete) {
      super.addWord(this._sentenceBuilder.toString());
      this._sentenceBuilder = new SentenceBuilder(this._options);
    }
  }
}

export class EssayBuilder extends EssayBuilderBase {
  private _paragraphBuilder: ParagraphBuilder;
  private readonly _paragraphsCount: number;

  public constructor(options: EssayBuilderOptions) {
    super("\n\n", options);
    this._paragraphBuilder = new ParagraphBuilder(options);
    const { max, min } = this._options.paragraphs;
    this._paragraphsCount = generateRandomNumber(max, min);
  }

  public get complete(): boolean {
    return this._chunks.length === this._paragraphsCount;
  }

  public addWord(word: string): void {
    this._paragraphBuilder.addWord(word);
    if (this._paragraphBuilder.complete) {
      super.addWord(this._paragraphBuilder.toString());
      this._paragraphBuilder = new ParagraphBuilder(this._options);
    }
  }
}
