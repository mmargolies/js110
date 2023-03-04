/* SELECTION

Mental Model:
Make an object to return the output. Iterating over the produce
object, create a new k/v pair on the output object if the value
associated with the current key === 'Fruit'. Return the output object.
*/

let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

function selectFruit(produceList) {
  let fruits = {};

  for (let key in produceList) {
    if (produceList[key] === 'Fruit') fruits[key] = produceList[key];
  }

  return fruits;
}

// console.log(selectFruit(produce)); // => { apple: 'Fruit', pear: 'Fruit' }
// --------------------------------------------------------------------------


/* TRANSFORMATION

Mental model:
Iterate through the input array. On each iteration, check to see if the
current number is even. If so, continue. Otherwise, reassign the current
number to the value of itself multiplied by two. Return the input array. */

// MUTATING
function doubleOddNumbers(numbers) {
  for (let idx = 0; idx < numbers.length; idx += 1) {
    if (numbers[idx] % 2 === 0) continue;

    numbers[idx] *= 2;
  }

  return numbers;
}

// NOT MUTATING
function copyDoubleOdds(numbers) {
  return numbers.map(num => {
    if (num % 2 === 0) return num;

    return num * 2;
  });
}

// console.log(copyDoubleOdds(myNumbers)); // => [2, 4, 6, 14, 2, 6]
// console.log(myNumbers); // => [1, 4, 3, 7, 2, 6]

let myNumbers = [1, 4, 3, 7, 2, 6];


function doubleOddIndices(numbers) {
  return numbers.map((num, idx) => {
    if (idx % 2 === 0) return num;

    return num * 2;
  });
}

// console.log(doubleOddIndices(myNumbers)); // => [1, 8, 3, 14, 2, 12]
// -----------------------------------------------------------------


// GENERIC FUNCTIONS: MULTIPLY COLLECTION BY n

let numlist = [1, 2, 3, 4];
const multiply = (numbers, multiplier) => numbers.map(num => num * multiplier);

console.log(multiply(numlist, 3)); // [3, 6, 9, 12]