const fs = require('fs');
const path = require('path');

const rules = fs.readFileSync(path.resolve(__dirname, './day-07-input.txt'), 'utf8').split('\n').filter((x) => x);

const bagsRulesMap = new Map();

function containsShinyGold(color) {
  if (color === 'shiny gold') return true;
  if (!bagsRulesMap.has(color)) return false;

  const innerBags = bagsRulesMap.get(color);
  for (const { color: bag } of innerBags) {
    if (containsShinyGold(bag)) return true;
  }
  return false;
}

for (const rule of rules) {
  [container, contents] = rule.split(' bags contain ');
  contents.replace(/\./, '').split(', ').map((bagtext) => {
    const { groups } = /((?<number>\d+) )?(?<color>.*)/.exec(bagtext.replace(/ bags?/, ''));
    if (!bagsRulesMap.has(container)) {
      bagsRulesMap.set(container, []);
    }
    if (!groups.number) groups.number = 0;
    bagsRulesMap.set(container, [...bagsRulesMap.get(container), groups]);
  });
}

function sumOfColorsContainingGold() {
  const colors = bagsRulesMap.keys();
  let counter = 0;

  for (const color of colors) {
    if (containsShinyGold(color) && color != 'shiny gold') counter++;
  }
  return counter;
}

function sumOfInsideBags(topBag) {
  if (topBag.number == 0) return 0;

  const innerBags = bagsRulesMap.get(topBag.color);
  let sum = 1;
  for (const bag of innerBags) {
    sum += parseInt(bag.number, 10) * sumOfInsideBags(bag);
  }
  return sum;
}

// console.log(bagsRulesMap);
console.log(`Day 7\nnumber of bag colors holding shiny gold bag: ${sumOfColorsContainingGold()}\nnumber of bags required inside single shiny gold bag: ${sumOfInsideBags({ number: 1, color: 'shiny gold' }) - 1}/n`);
