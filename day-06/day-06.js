const fs = require('fs');
const path = require('path');

const groups = fs.readFileSync(path.resolve(__dirname, './day-06-input.txt'), 'utf8').split('\n\n').filter((x) => x);

let totalUniqueAnswers = 0;
let totalCommonAnswers = 0;

for (let group of groups) {
  const uniques = new Set([...group.split('\n').join('')]);
  totalUniqueAnswers += uniques.size;

  totalCommonAnswers += [...uniques].filter((char) => group.split('\n').filter((x) => x).every((form) => form.includes(char))).length;
}

console.log(`Day 6\nnumber of questions answered 'yes' by anyone in group: ${totalUniqueAnswers}\nnumber of questions answered 'yes' by everyone in group: ${totalCommonAnswers}\n`);

// const uniqueAnswers = answers.map((e) => e.join('')).map((e) => new Set(e));
// const sumOfUniqueAnswers = uniqueAnswers.reduce((sum, set) => sum += set.size, 0);

// // console.log(`Day 6\nsum of unique answers on board: ${sumOfUniqueAnswers}`);

// // console.log(answers);
// const commonAnswers = answers.reduce((sumAcc, groupAnswers) => {
//   let common = {};
//   // console.log(groupAnswers);
//   groupAnswers.sort((b, a) => a.length - b.length).map((passengerAnswers) => {
//     passengerAnswers.split('').forEach((e) => {
//       (!common[e]) ? common[e] = 1 : common[e]++;
//       // if (!common[e]) {
//       //   common[e] = 1;
//       // } else {
//       //   common[e]++;
//       // }
//     });
//   });
//   let sum = Object.values(common).sort((a, b) => b - a).reduce((acc, val, index, array) => {
//     if (val === array[0]) acc++;
//     return acc;
//   }, 0);
//   // console.log(sum);
//   return sumAcc += sum;
// }, 0);
// PLEASE END ME
// console.log(commonAnswers);