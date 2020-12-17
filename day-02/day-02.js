const fs = require('fs');
const path = require('path');

const passwordsList = fs.readFileSync(path.resolve(__dirname, './day-2-input.txt'), 'utf8');

function countVerifiedPasswords(input) {
  return input
    .split('\n')
    .reduce((validPasswords, currentPassword) => {
      const parts = currentPassword.split(' ');
      const minPolicy = parts[0].split('-')[0];
      const maxPolicy = parts[0].split('-')[1];
      const letterPolicy = parts[1].charAt(0);
      const passwordBody = parts[2].split('');
      const passwordMatches = passwordBody.filter((letter) => letter === letterPolicy).length;

      if (passwordMatches <= maxPolicy && passwordMatches >= minPolicy) {
        return ++validPasswords;
      }
      return validPasswords;
    }, 0);
}

function countVerifiedPasswordsRightVersion(input) {
  return input
    .split('\n')
    .reduce((validPasswords, currentPassword) => {
      const parts = currentPassword.split(' ');
      const firstPos = parts[0].split('-')[0];
      const secondPos = parts[0].split('-')[1];
      const letterPolicy = parts[1].charAt(0);
      const passwordBody = parts[2].split('');
      const firstPosMatch = passwordBody[firstPos - 1] === letterPolicy;
      const secondPosMatch = passwordBody[secondPos - 1] === letterPolicy;

      if ((firstPosMatch !== secondPosMatch)) {
        return ++validPasswords;
      }
      return validPasswords;
    }, 0);
}

console.log(countVerifiedPasswords(passwordsList));
console.log(countVerifiedPasswordsRightVersion(passwordsList));
