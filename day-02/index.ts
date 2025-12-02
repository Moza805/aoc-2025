import { readFileSync } from "fs";

const data = readFileSync("./input.txt", "utf-8");

var ranges = data.split(",").map((x) => x.split("-"));

const matches = (input: string, splitPoint: number): boolean => {
  if (input.length % splitPoint !== 0) {
    return false;
  }
  const splits: string[] = [];

  let index = 0;
  while (index < input.length) {
    splits.push(input.slice(index, index + splitPoint));
    index += splitPoint;
  }

  const matches = splits.every((x) => x === splits[0]);
  return matches;
};

let total = ranges.reduce((total, range) => {
  const start = +range[0];
  const end = +range[1];

  let sum = 0;

  for (let i = start; i <= end; i++) {
    const value = i.toString();

    if (value.length % 2 !== 0) {
      continue;
    }

    let parts = [
      value.slice(0, value.length / 2),
      value.slice(value.length / 2),
    ];
    if (parts[0] == parts[1]) {
      sum += i;
    }
  }

  return total + sum;
}, 0);

console.log(total);

total = ranges.reduce((total, range) => {
  const start = +range[0];
  const end = +range[1];

  let sum = 0;

  for (let i = start; i <= end; i++) {
    const value = i.toString();
    let splitPoint = 1;

    while (splitPoint <= value.length / 2) {
      if (matches(value, splitPoint)) {
        sum += i;
        break;
      }
      splitPoint++;
    }
  }

  return total + sum;
}, 0);

console.log(total);
