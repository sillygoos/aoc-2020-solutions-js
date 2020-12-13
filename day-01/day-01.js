const fs = require('fs')
const path = require('path')

let input = fs.readFileSync(path.resolve(__dirname, './day-1-input.txt'), 'utf8').split('\n').map(Number)

function findPairs(input) {
    for(let i = 0; i < input.length; i++) {
        for(let j = i + 1; j < input.length; j++) {
            let sum = input[i] + input[j];
            if(sum === 2020) {
                return input[i] * input[j];
            }
        }
    }
}

function findTriplets(input) {
    for(let i = 0; i < input.length; i++) {
        for(let j = i + 1; j < input.length; j++) {
            for(let p = j + 1; p < input.length; p++) {
                let sum = input[i] + input[j] + input[p];
                if(sum === 2020) {
                    return input[i] * input[j] * input[p]; 
                }
            }
        }
    }
}

console.log(findPairs(input))
console.log(findTriplets(input))