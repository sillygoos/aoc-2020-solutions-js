const fs = require('fs');
const path = require('path');

const seatCode = fs.readFileSync(path.resolve(__dirname, './day-5-input.txt'), 'utf8').split('\n');

/**
 *
 * @param {string} rowCoordinateString
 */
function getRow(rowCoordinateString) {
  let upper = 127;
  let lower = 0;

  for (let i = 0; i < 7; ++i) {
    const pivot = Math.floor((upper - lower) / 2 + lower);
    switch (rowCoordinateString[i]) {
      case 'F':
        upper = pivot;
        break;
      case 'B':
        lower = pivot + 1;
        break;
      default:
        console.log('somethings not right, check input, ROW');
    }
  }
  return upper;
}
/**
 *
 * @param {string} colCoordinateString
 */
function getColumn(colCoordinateString) {
  let upper = 7;
  let lower = 0;

  for (let i = 7; i < 10; ++i) {
    const pivot = Math.floor((upper - lower) / 2 + lower);
    switch (colCoordinateString[i]) {
      case 'L':
        upper = pivot;
        break;
      case 'R':
        lower = pivot + 1;
        break;
      default:
        console.log('somethings not right, check input, COL');
    }
  }
  return upper;
}

/**
 *
 * @param {string[]} seatCoordinates
 */
function getExactSeat(seatCoordinates) {
  return seatCoordinates.map((e) => {
    if (e.length !== 10) {
      return 'invalid coordinate string';
    }
    // const rowString = e.substring(0, 7);
    // const colString = e.substring(7);
    const row = getRow(e);
    const col = getColumn(e);
    return { col, row, ID: ((row * 8) + col) };
  });
}

/**
 *
 * @param {{col: number, row: number, ID: number}[]} seat
 */
function checkGaps(seats) {
  const seatIDs = seats.map((seatInformation) => seatInformation.ID);
  for (let i = 0; i < seatIDs.length; i++) {
    if (!(seatIDs[i++] - seatIDs[i] === 1)) {
      if (seatIDs[i] + 1) {
        return seatIDs[i] + 1;
      }
    }
  }
}

const seatsSortedByID = getExactSeat(seatCode).sort((b, a) => a.ID - b.ID);
// checkGaps(seatsSortedByID);

console.log(`Day 5\nhighest ID among seats: ${seatsSortedByID[0].ID}\nyour seat ID: ${checkGaps(seatsSortedByID)}`);
