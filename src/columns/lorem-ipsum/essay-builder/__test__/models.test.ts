import { getLowercaseChars } from "@mantlebee/ts-core";
import { EssayBuilder } from "../models";

describe("LoremIpsumColumn", () => {
  describe("EssayBuilder", () => {
    describe("models", () => {
      describe("EssayBuilder", () => {
        it("Generates a text with one word only: 'miao'", () => {
          const builder = new EssayBuilder({
            paragraphs: { max: 1, min: 1 },
            sentencesPerParagraph: { max: 1, min: 1 },
            wordsPerSentence: { max: 1, min: 1 },
          });
          while (!builder.complete) {
            builder.addWord("miao");
          }
          expect(builder.toString()).toEqual(`Miao`);
        });
        it("Generates a text with 2 paragraphs, 3 sentences per paragrah, 4 words per sentence, but all words are 'miao'", () => {
          const builder = new EssayBuilder({
            paragraphs: { max: 2, min: 2 },
            sentencesPerParagraph: { max: 3, min: 3 },
            wordsPerSentence: { max: 4, min: 4 },
          });
          while (!builder.complete) {
            builder.addWord("miao");
          }
          expect(builder.toString())
            .toEqual(`Miao miao miao miao. Miao miao miao miao. Miao miao miao miao.

Miao miao miao miao. Miao miao miao miao. Miao miao miao miao.`);
        });
        it("Generates a text with 3 paragraphs, 3 sentences per paragrah, 3 words per sentence. Words are consecutive alphabet letters plus an exclamation mark at the end", () => {
          const builder = new EssayBuilder({
            paragraphs: { max: 3, min: 3 },
            sentencesPerParagraph: { max: 3, min: 3 },
            wordsPerSentence: { max: 3, min: 3 },
          });
          const chars = getLowercaseChars() + "!";
          let index = 0;
          while (!builder.complete) {
            builder.addWord(chars[index]);
            ++index;
          }
          expect(builder.toString()).toEqual(
            `A b c. D e f. G h i.

J k l. M n o. P q r.

S t u. V w x. Y z !.`
          );
        });
      });
    });
  });
});
