const { count } = require('console');
const fs = require('fs')
const path = require('path')

let input = fs.readFileSync(path.resolve(__dirname, './day2input.txt'), 'utf8')

// console.log(input)

function countVerifiedPasswords(input) {
    return input
            .split('\n')
            .reduce((validPasswords, currentPassword) => {
                let parts = currentPassword.split(' ');
                let minPolicy = parts[0].split('-')[0];
                let maxPolicy = parts[0].split('-')[1];
                let letterPolicy = parts[1].charAt(0);
                let passwordBody = parts[2];

                let isMinPolicy = 
            }, 0);
}

console.log(countVerifiedPasswords(input))