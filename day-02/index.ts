import { readFileSync } from "fs";

const data = readFileSync("./input.txt", "utf-8");

var ranges = data.split(",").map((x) => x.split("-"));

console.log(ranges);

const total = ranges.reduce((total, range) => {
  const start = +range[0];
  const end = +range[1];

  let sum = 0;

  for (let i = start; i <= end; i++) {
    let value = i.toString();
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

console.log(total)