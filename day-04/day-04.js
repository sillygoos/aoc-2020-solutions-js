const fs = require('fs');
const path = require('path');

const passportDataFormatted = fs.readFileSync(path.resolve(__dirname, './day-4-input.txt'), 'utf8')
  .split('\n\n')
  .filter(x => x);
  // .map((entry) => entry.split('\n').join(' '));

// const eyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);

/**
 * 
 * @param {string} input 
 * @param {number} from 
 * @param {number} to 
 */
function yearValidation(input, from, to) {
  const intPut = parseInt(input);
  if (input.length !== 4) {
    return false;
  } else if (intPut < from || intPut > to) {
    return false;
  } else {
    return true;
  }
}

/**
 * 
 * @param {string} input 
 */
function heightCheck(input) {
  const units = input.substring(input.length - 2);
  const value = parseInt(input.substring(0, input.length - 2));
  if (units === 'cm') {
    return (value >= 150 && value <= 193) ? true : false;
  } else if (units === 'in') {
    return (value >= 59 && value <= 76) ? true : false;
  }
  return false;
}

class Passport {
  static required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  static eyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'])
  static validators = {
    byr: (input) => yearValidation(input, 1920, 2002),
    iyr: (input) => yearValidation(input, 2010, 2020),
    eyr: (input) => yearValidation(input, 2020, 2030),
    hgt: (input) => heightCheck(input),
    hcl: (input) => /^#[0-9a-f]{6}$/.test(input),
    ecl: (input) => this.eyeColors.has(input),
    pid: (input) => /^\d{9}$/.test(input),
    cid: (input) => true
  }
  /**
   * 
   * @param {string} input 
   */
  constructor(input) {
    this.map = new Map();
    const list = input.split(/\s+/g);
    list.forEach((entry) => {
      const [key, value] = entry.split(':');
      this.map.set(key, value);
    });
  }
  
  isKeysValid() {
    return Passport.required.every((key) => this.map.has(key))
  }

  isFullyValid() {
    return this.isKeysValid() && [...this.map.entries()].every(([key, value]) => Passport.validators[key](value));
  }
}

let validKeysCounter = 0;
let fullyValidCounter = 0;

for (entry of passportDataFormatted) {
  const passport = new Passport(entry);
  if (passport.isKeysValid()) { validKeysCounter++ };
}

for (entry of passportDataFormatted) {
  const passport = new Passport(entry);
  if (passport.isFullyValid()) { fullyValidCounter++ };
}

console.log(`Day 4\npassports with valid keys: ${validKeysCounter}\npassports with valid keys and fields: ${fullyValidCounter}\n`);