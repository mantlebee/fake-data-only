/**
 * Capitalizes the first letter of a text.
 * @param text Text to capitalize the first letter.
 * @returns the given text, with the first letter capitalized.
 */
export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
