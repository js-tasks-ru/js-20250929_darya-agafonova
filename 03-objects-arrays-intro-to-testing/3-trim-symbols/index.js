/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (typeof size == "undefined") {
    return string;
  }

  let currentSize = 0;
  let currentLetter = string[0];
  let newString = "";
  for (let letter of string) {
    if (currentLetter == letter) {
      currentSize++;
    } else {
      currentLetter = letter;
      currentSize = 1;
    }

    if (currentSize <= size) {
      newString += letter;
    }
  }

  return newString;
}
