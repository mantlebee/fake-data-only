import { capitalizeFirstLetter } from "../utils";

describe("ColumnLoremIpsum", () => {
  describe("EssayBuilder", () => {
    describe("utils", () => {
      describe("capitalizeFirstLetter", () => {
        it("Capitalizes the first letter of a text", () => {
          expect(capitalizeFirstLetter("hello")).toBe("Hello");
        });
      });
    });
  });
});
