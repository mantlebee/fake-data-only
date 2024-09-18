export type EssayBuilderOption = number | { max: number; min: number };

export type EssayBuilderOptions = {
  paragraphs: EssayBuilderOption;
  sentencesPerParagraph: EssayBuilderOption;
  wordsPerSentence: EssayBuilderOption;
};
