/* Problem 17:
A UUID is a type of identifier often used to uniquely identify items, even when some of those items were created on a different server or by a different application. That is, without any synchronization, two or more computer systems can create new items and label them with a UUID with no significant risk of stepping on each other's toes. It accomplishes this feat through massive randomization. The number of possible UUID values is approximately 3.4 X 10E38, which is a huge number. The chance of a conflict is vanishingly small with such a large number of possible values.

Each UUID consists of 32 hexadecimal characters (the digits 0-9 and the letters a-f) represented as a string. The value is typically broken into 5 sections in an 8-4-4-4-12 pattern, e.g., 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.

Write a function that takes no arguments and returns a string that contains a UUID.

Input: None
Output: UUID as a string -- 5 sections in hyphen separated groups of 8-4-4-4-12
          total of 32 hexadecimal chars (excluding hyphens)

Rules:
  - None really, besides the proper UUID format above

DATA STRUCTURE:
  - a string that keeps getting concatenated?
  - an array containing a string for each section, joined together for output?

ALGO (hilvl):
  - Create an array
  - Push a hex string of the desired length to the array (8, 4, 4, 4, 12)
    - repeat the above the desired number of times (5)
  - join the array to a string with '-' as the separator
  - return the now joined string

  FOR HEX STRING:
  - Generate a random integer from 0 - 15 INCLUSIVE
      - convert to a string with a radix of 16
  - repeat the above the desired amount of times
*/

function generateHex(length) {
  let hex = '';

  for (let itr = length; itr > 0; itr -= 1) {
    hex += Math.floor(Math.random() * 16).toString(16);
  }

  return hex;
}

function generateUUID() {
  let UUID = [];
  let groups = [8, 4, 4, 4, 12];

  groups.forEach(groupLength => UUID.push(generateHex(groupLength)));

  return UUID.join('-');
}

console.log(generateUUID());