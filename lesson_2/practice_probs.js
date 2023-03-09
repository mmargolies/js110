// Problem 1: order the following array by descending numeric value, keeping
// the elements as strings
let arr = ['10', '11', '9', '7', '8'];
arr.sort((a, b) => Number(b) - Number(a));

// console.log(arr);
//---------------------------------------------------------------------------


// Problem 2: How would you order the following array of objects based on the
// year of publication of each book, from the earliest to the latest?
/*
- access each objects .published value
    - explicitly coerce to number
*/

let books = [
  { title: 'One Hundred Years of Solitude',
    author: 'Gabriel Garcia Marquez',
    published: '1967'
  },
  { title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    published: '1925'
  },
  { title: 'War and Peace',
    author: 'Leo Tolstoy',
    published: '1869'
  },
  { title: 'Ulysses',
    author: 'James Joyce',
    published: '1922'
  },
  { title: 'The Book of Kells',
    author: 'Multiple Authors',
    published: '800'
  },
];

books.sort((a, b) => Number(a.published) - Number(b.published));
// console.log(books);
//---------------------------------------------------------------------------


// Problem 3: For each of these collection objects, demonstrate how you would
// access the letter g.
let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
arr1[2][1][3];

let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] },
  { third: ['g', 'h', 'i'] }];
arr2[1].third[0];

let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
arr3[2].third[0][0];

let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
obj1.b[1];

let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }};
Object.keys(obj2.third)[0];
//---------------------------------------------------------------------------


// Problem 4: For each of these collection objects, demonstrate how you would
// change the value 3 to 4.

let arr4 = [1, [2, 3], 4];
arr4[1][1] = 4;

let arr5 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
arr5[2] = 4;

let obj3 = { first: [1, 2, [3]] };
obj3['first'][2][0] = 4;

let obj4 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
obj4['a']['a'][2] = 4;
//---------------------------------------------------------------------------


// Problem 5: Compute and display the total age of the male members of the
// family from the following nested object:

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let total = 0;

Object.values(munsters).forEach(obj => {
  if (obj.gender === 'male') total += obj.age;
});
// console.log(total);
//---------------------------------------------------------------------------


/* Problem 6: One of the most frequently used real-world string operations is that of "string substitution," where we take a hard-coded string and modify it with various parameters from our program.

Given this previously seen family object, print the name, age, and gender of each family member:
(Name) is a (age)-year-old (male or female).
*/
// let names = Object.keys(munsters);
/* names.forEach(name => {
  console.log(`${name} is a ${munsters[name]['age']}-year-old ` +
              `${munsters[name]['gender']}`
  );
});

Object.entries(munsters).forEach(member => {
  let name = member[0];
  let age = member[1]['age'];
  let gender = member[1]['gender'];

  console.log(`${name} is a ${age}-year-old ${gender}`);
}); */
//---------------------------------------------------------------------------


// Problem 8: Using the forEach method, write some code to output all vowels
// from the strings in the arrays. Don't use a for or while loop.
let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

const VOWELS = 'aeiou';

Object.values(obj).flat().forEach(str => {
  str.split('').forEach(char => {
    // if (VOWELS.includes(char)) console.log(char);
  });
});
//---------------------------------------------------------------------------


/* Problem 9 + 10: Given the following data structure, return a new array with the same structure, but with the values in each subarray ordered -- alphabetically or numerically as appropriate -- in ascending order. Then do it in descending order.
*/

let toSort = [['b', 'c', 'a'], [2, 11, -3], ['blue', 'black', 'green']];
// let sorted = toSort.map(arr => {
//   return arr.slice().sort((a, b) => {
//     if (typeof a === 'number') return a - b;

//     if (a > b) {
//       return 1;
//     } else if (a < b) {
//       return -1;
//     } else {
//       return 0;
//     }
//   });
// });
let ascending = toSort.map(arr => {
  if (typeof arr[0] === 'string') return arr.slice().sort();

  return arr.slice().sort((a, b) => a - b);
});

let descending = toSort.map(arr => {
  if (typeof arr[0] === 'number') {
    return arr.slice().sort((a, b) => b - a);
  }
  return arr.slice().sort((a, b) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
});

// console.log(ascending);
// console.log(descending);
// console.log(toSort);
//---------------------------------------------------------------------------


// Problem 11: Given the following data structure, use the map method to return a new array identical in structure to the original but, with each number incremented by 1. Do not modify the original data structure.

let arr6 = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

/* let plusOne = arr6.map(obj => {
  let copy = Object.assign({}, obj);

  for (const key in copy) {
    copy[key] += 1;
  }

  return copy;
}); */

let plusOne = arr6.map(obj => {
  let copy = {};

  for (const key in obj) {
    copy[key] = obj[key] + 1;
  }

  return copy;
});

// console.log(plusOne);
// console.log(arr6);
//---------------------------------------------------------------------------


// Problem 12: Given the following data structure, use a combination of methods, including filter, to return a new array identical in structure to the original, but containing only the numbers that are multiples of 3.
let filterMe = [[2], [3, 5, 7], [9], [11, 15, 18]];

let threes = filterMe.map(arr => arr.filter(num => num % 3 === 0));
// console.log(threes);
// console.log(filterMe);
//---------------------------------------------------------------------------


// Problem 13: Given the following data structure, sort the array so that the sub-arrays are ordered based on the sum of the odd numbers that they contain.

let oddSort = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];
/* const reduceOdds = (sum, num) => {
  if (num % 2 === 1) return sum + num;
  return sum;
};

oddSort.sort((a, b) => {
  return a.reduce(reduceOdds, 0) - b.reduce(reduceOdds, 0);
});
console.log(oddSort); */

oddSort.sort((a, b) => {
  let oddsA = a.filter(num => num % 2 === 1).reduce((sum, num) => sum + num);
  let oddsB = b.filter(num => num % 2 === 1).reduce((sum, num) => sum + num);

  return oddsA - oddsB;
});

// console.log(oddSort);
//---------------------------------------------------------------------------


/* Problem 14:
  Given the following data structure write some code to return an array containing the colors of the fruits and the sizes of the vegetables. The sizes should be uppercase, and the colors should be capitalized.
*/

let produce = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

let capitalize = str => str[0].toUpperCase() + str.slice(1);

let produceData = Object.values(produce).map(data => {
  if (data['type'] === 'fruit') {
    return data['colors'].map(color => capitalize(color));
  } else {
    return data['size'].toUpperCase();
  }
});

// console.log(produceData);
// [["Red", "Green"], "MEDIUM", ["Red", "Green"], ["Orange"], "LARGE"]
//---------------------------------------------------------------------------


/* Problem 15:
Given the following data structure, write some code to return an array which contains only the objects where all the numbers are even.

filter ->
  ITR over current object ->
    ITR over current VALUE(array) ->
      IF current value(number) odd ?? RETURN false
      RETURN true
 */

let getEvens = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

/* let evens = getEvens.filter(obj => {
  for (const key in obj) {
    let arr = obj[key];

    for (let num of arr) {
      if (num % 2 === 1) return false;
    }
  }

  return true;
}); */

let evens = getEvens.filter(obj => {
  return Object.values(obj).every(subArr => {
    return subArr.every(num => num % 2 === 0);
  });
});

// console.log(evens);
//---------------------------------------------------------------------------


// Problem 16: Given the following data structure, write some code that defines
// an object where the key is the first item in each subarray, and the value is
// the second.

let arr0 = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];
let ones = {};

arr0.forEach(subArr => ones[subArr[0]] = subArr[1]);
console.log(ones);
//---------------------------------------------------------------------------


