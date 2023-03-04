// Problem 8
// Create an object from the array, where each k/v pair
// is an element from the array paired w/it's array index

let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

function createObj(array) {
  let output = {};
  array.forEach((ele, idx) => output[ele] = idx);

  return output;
}

// console.log(createObj(flintstones));
// { Fred: 0, Barney: 1, Wilma: 2, Betty: 3, Pebbles: 4, Bambam: 5 }
// -----------------------------------------------------------------

// Problem 9
// Add up all values from the following object:

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let sumOfAges = Object.values(ages).reduce((a, b) => a + b);

// console.log(sumOfAges);
// -----------------------------------------------------------------

// Problem 10
// Create an object that expresses the frequency with which each letter occurs in this string:

let statement = "The Flintstones Rock";

let freq = {};

[...statement.split(' ').join('')].forEach(char => {
  if (!freq.hasOwnProperty(char)) {
    freq[char] = 1;
  } else {
    freq[char] += 1;
  }
  // freq.hasOwnProperty(char) ? freq[char] += 1 : freq[char] = 1;
});

console.log(freq); // { T: 1, h: 1, e: 2, F: 1, l: 1, ... }