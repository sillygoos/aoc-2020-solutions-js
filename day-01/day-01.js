const fs = require('fs');
const path = require('path');

const numbersList = fs.readFileSync(path.resolve(__dirname, './day-01-input.txt'), 'utf8').split('\n').map(Number);

/**
 *
 * @param {number} input
 */
function findPairs(input) {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const sum = input[i] + input[j];
      if (sum === 2020) {
        return input[i] * input[j];
      }
    }
  }
}

/**
 *
 * @param {number} input
 */
function findTriplets(input) {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      for (let p = j + 1; p < input.length; p++) {
        const sum = input[i] + input[j] + input[p];
        if (sum === 2020) {
          return input[i] * input[j] * input[p];
        }
      }
    }
  }
}

console.log(`Day 1\npairs: ${findPairs(numbersList)}\ntriplets: ${findTriplets(numbersList)}\n`);
