const fs = require('fs');
const path = require('path');

const instructions = fs.readFileSync(path.resolve(__dirname, './day-08-input.txt'), 'utf8').split('\n').filter((x) => x).map((instruction) => {
  [ directive, value ] = instruction.split(' ');
  return { directive, value: parseInt(value, 10) };
});

function execute(program) {
  const history = []
  let instructionPointer = 0;
  let accumulator = 0;
  
  while (instructionPointer < program.length && !history.includes(instructionPointer)) {
    history.push(instructionPointer);
    switch(program[instructionPointer].directive) {
      case 'nop':
        instructionPointer += 1;
        break;
        case 'jmp':
          instructionPointer += program[instructionPointer].value;
          break;
      case 'acc':
        accumulator += program[instructionPointer].value;
        instructionPointer += 1;
        break;
        default:
          // assert(false, `unknown instruction ${listOfInstructions[instructionPointer]}`);
        }
      }
  return {
    accumulator,
    visited: history,
    terminated: instructionPointer >= program.length
  };
}

function catchLoop(program) {
  return execute(program).accumulator;
}

function flip(instruction) {
  switch(instruction) {
    case 'jmp': return 'nop';
    case 'nop': return 'jmp';
    default: assert(false, `unexpected instruction ${instruction}`)
  }
}

function fixTerminate(program) {
  const { visited } = execute(program);

  for (const ip of visited) {
    if (program[ip].directive !== 'acc') {
      program[ip].directive = flip(program[ip].directive);
      const result = execute(program);
      if (result.terminated) return result.accumulator;
      program[ip].directive = flip(program[ip].directive);
    }
  }
  return accumulator;
}

console.log(`Day 8\nvalue of accumulator before the loop starts: ${execute(instructions).accumulator}\nvalue of accumulator in fixed program on termination: ${fixTerminate(instructions)}`);