const fs = require('fs');
const path = require('path');

const forestMap = fs.readFileSync(path.resolve(__dirname, './day-3-input.txt'), 'utf8').split('\n').map((e) => e.split(''));

/**
 *
 * @param {string[][]} map
 * @param {number} dx
 * @param {number} dy
 */
function countTrees(map, dx, dy) {
  const height = map.length;
  const width = map[0].length;

  let y = dy;
  let x = dx % width;
  let counter = 0;

  while (y < height) {
    if (map[y][x] === '#') {
      counter += 1;
    }
    y += dy;
    x = (x + dx) % width;
  }
  return counter;
}

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

/**
 *
 * @param {string[][]} map
 * @param {number[][]} slopeData
 */
function productOfTreeEncounters(map, slopeData) {
  return slopeData.reduce((product, slope) => product *= countTrees(map, ...slope), 1);
}

console.log(`Day 3\nhappy trees encountered: ${countTrees(forestMap, 3, 1)}\nthis, but five times and slope get different every time: ${productOfTreeEncounters(forestMap, slopes)}\n`);
