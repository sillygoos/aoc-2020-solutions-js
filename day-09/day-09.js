const fs = require('fs');
const path = require('path')

const data = fs.readFileSync(path.resolve(__dirname, './day-09-input.txt'), 'utf8').split('\n');

function main(input) {
  const SIZE = 25;

  for(let i = 0; i < input.length - SIZE - 1; i++) {
      const arr = input.slice(i, i + SIZE);
      const value = input[i + SIZE];
      console.log(`Check ${i + SIZE + 1} number with value ${value}`);
      const result = isContainsSum(arr, value);
      if(!result) {
          console.log(`Found value ${value}`);
          console.log(arr);
          return value;
      }
  }
  return false;
}

function isContainsSum(arr, value) {
  for(let i = 0; i < arr.length; i++) {
      for(let j = 1; j < arr.length - 1; j++) {
          if (parseInt(arr[i], 10) + parseInt(arr[j], 10) === parseInt(value)) return true;
      }
  }
}

function findSet(arr, target) {
  for (let j = 0; j < arr.length; j++) {
    for (let i = j, sum = 0, results = []; sum <= target; i++) {
      sum += parseInt(arr[i]);
      // results.push(ar)
      if (sum === target && j !== i) {
        const set = arr.slice(j, i + 1).map((x) => parseInt(x)).sort((a, b) => a - b);
        console.log(`found set: ${set[0]} to ${set[set.length - 1]}, sum is ${set[set.length - 1] + set[0]}`)
      };
    }
  }
}

console.log(`Day 9`);
findSet(data, 32321523);