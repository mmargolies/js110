/* PROBLEM:
Given an array of strings, return a new array where the strings are sorted to the highest number of adjacent consonants a particular string contains. If two strings contain the same highest number of adjacent consonants they should retain their original order in relation to each other. Consonants are considered adjacent if they are next to each other in the same word or if there is a space between two consonants in adjacent words.

Input: An array of strings
Output: New array, where all strings are sorted to the highest # of adjacent
        consonants contained w/in them.

Rules:
  Explicit:
    - If two strings have same # of consonants, leave them in original order
    - Consonants are adjactent if they are:
        - next to each other in the same word
        - space between them in adjacent words
  Implicit:
    - Don't mutate the input array
    - Sort in descending order
    - No empty strings
    - No empty arrays
    - Everything is lowercase
    - Single consonans don't affect sort order

Questions:
  - Strings can be multiple words?
  - MISSED:
      - case sensitive?
      - always multiple words?
      - empty strings?
      - empty array?
      - sort in ascending or descending?

Mental Model:
  Make a copy of the input array, then ...............................
  Iterate through the input array. On each iteration, calculate the # of
  adjacent consonants in the current string. Additionally, calculate the # of
  adjacent cosonants in the next string. If the former # is larger, move the
  current string ahead of the next string. Continue to the next string until the
  last string of the array is reached. Repeat the entire iteration process until
  no elements need to be moved. Return the array

DATA STRUCTURE:
  An array, speficially a NEW array -- the input array should
  not be mutated!

  Perhaps a 2nd array which has all the vowels in it, which we can use to check
  for (adjacent) cosonants in each element

ALGO:
  - Create a copy of the input array
  - Iterate through the copy of the input array:
      - Is there another element after the current one?
      - If so:
        - Calculate the # of adjacent consonants in the current element
        - Calculate the # of adjacent cosonants the in the next element
        - If the former is bigger:
            - Leave it be
        - If the former is smaller:
            - Move it ahead of the latter
      - If not:
        -


MINI ALGO -- calculating adjacent consonants:
INPUT: current string in iteration
OUTPUT: # of adjacent consonants

  - create a variable to store # of adjacent consonants
  - Remove all spaces from the current string
  - Is the current character a consonant?
  - If yes:
      - Are either of the characters before OR after it a consonant?
      - If yes:
          - increment the counter variable
  - If no:
    - continue
*/

const VOWELS = 'aeiou';

function getAdjConsonants(str) {
  let adjacent = 0;
  let currAdjacent = 0;
  str = str.split(' ').join('');

  for (let idx = 0; idx < str.length - 1; idx += 1) {
    if (!VOWELS.includes(str[idx])) {
      currAdjacent += 1;
    } else {
      if (currAdjacent > adjacent) adjacent = currAdjacent;
      currAdjacent = 0;
    }

    if (currAdjacent > adjacent) adjacent = currAdjacent;
  }
  return adjacent;
}

function sortStringsByConsonants(arr) {
  let sorted = arr.slice();

  sorted.sort((a, b) => getAdjConsonants(b) - getAdjConsonants(a));
  return sorted;
}


console.log(sortStringsByConsonants(['aa', 'ddaddaddadda', 'baa', 'ccaa', 'dddaa']));
// 3, 2, 0, 0
// ['dddaa', 'ccaa', 'aa', 'baa']

console.log(sortStringsByConsonants(['can can', 'toucan', 'batman', 'salt pan']));
// 3, 2, 2, 0
// ['salt pan', 'can can', 'batman', 'toucan']
console.log(sortStringsByConsonants(['bar', 'car', 'far', 'jar']));
// 0, 0, 0, 0
// ['bar', 'car', 'far', 'jar']
console.log(sortStringsByConsonants(['day', 'week', 'month', 'year']));
// 3, 0, 0, 0
// ['month', 'day', 'week', 'year']