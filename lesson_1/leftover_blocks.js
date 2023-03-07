/* PROBLEM:
Write a program that, given the number for a specific amount of cubes, calculates the number of blocks left over after building the tallest possible valid structure.

Input: a number, representing the # of available cubes
Output: a number, representing the # of blocks left over after building
        tallest possible (valid) structure

Rules:
  Explicit:
    - The building blocks are cubes
    - The structure is built in layers
    - The top layer is a single block
    - A block in an upper layer must be supported by 4 blocks in a lower layer
    - A block in a lower layer can support more than one block in an upper layer
    - You cannot leave gaps between blocks
  Implicit:
    - The input will always be a number
    - It's possible to have gap between blocks, although it is disallowed
    - A valid structure can be only 1 layer

  Questions:
    - What defines a layer?
    - Is there a limit to how mny blocks a given block can support?
    - What defines a gap?
    - Will there always be a possible valid structure?()
      - If not, what to return?

  Mental Model:
    Take the number of total cubes and, starting with the topmost layer of 1 cube, progressively subtracting the layer # squared from the total number of cubes. If this number would be smaller than 0, return the current number of cubes.

DATA STRUCT:
  Variable holding a number

ALGO:
0. Start with a count of blocks derived from the input
1. Starting with layer # 1 (topmost layer)
2. Check if subtracting (layer #) ^ 2 from the current # of cubes would
result in a number >= 0.
3. If so:
- increment the layer #
- subtract the (layer #) ^ 2 from the current # of blocks
- go to step 2
4. If not, return the current # of cubes
 */

function calculateLeftoverBlocks(blocks) {
  let currentBlocks = blocks;

  for (let layer = 1; currentBlocks - (layer ** 2) >= 0; layer += 1) {
    currentBlocks -= (layer ** 2);
  }

  return currentBlocks;
}

console.log(calculateLeftoverBlocks(0) === 0); //true
console.log(calculateLeftoverBlocks(1) === 0); //true
console.log(calculateLeftoverBlocks(2) === 1); //true
console.log(calculateLeftoverBlocks(4) === 3); //true
console.log(calculateLeftoverBlocks(5) === 0); //true
console.log(calculateLeftoverBlocks(6) === 1); //true
console.log(calculateLeftoverBlocks(14) === 0); //true

