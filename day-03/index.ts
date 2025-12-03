import { readFileSync } from "fs";

const data = readFileSync("./input.txt", "utf-8");

const validValues = ["9", "8", "7", "6", "5", "4", "3", "2", "1"];

const banks = data.split(/\r\n/).map((bank) => bank.split(""));

// returns an array of locations for each potential joltage 9-0 in that order
const getJoltageLocations = (bank: string[]): number[][] => {
  const joltageIndices = validValues.reduce((valueAgg, validValue) => {
    const indices = bank.reduce(
      (agg, joltage, index) => (joltage === validValue ? [...agg, index] : agg),
      []
    );

    valueAgg.push(indices);

    return valueAgg;
  }, []);

  return joltageIndices;
};

const getLargestJoltagePotential = (
  joltageLocations: number[][],
  bankSize: number,
  searchingFor: number = 9,
  firstIndex: number = -1
): string => {
  const lookingForSecond = firstIndex > -1;
  const currentIndices = joltageLocations[9 - searchingFor];
  const index = currentIndices?.find((idx) => idx > firstIndex);
  const hasIndices = index !== undefined;
  const isAtEnd = index === bankSize - 1;

  if (hasIndices && (!isAtEnd || lookingForSecond)) {
    var joltage = searchingFor;
    var secondJoltage = lookingForSecond
      ? ""
      : getLargestJoltagePotential(
          [
            ...joltageLocations.slice(0, 9 - searchingFor),
            joltageLocations[9 - searchingFor].slice(1),
            ...joltageLocations.slice(9 - searchingFor + 1),
          ],
          bankSize,
          9,
          index
        );
    return `${joltage}${secondJoltage}`;
  }
  if (!!joltageLocations.length) {
    return getLargestJoltagePotential(
      joltageLocations,
      bankSize,
      searchingFor - 1,
      isAtEnd ? firstIndex : index ?? firstIndex
    );
  }
  return "";
};

console.log(
  banks.reduce((agg, bank) => {
    const joltageLocations = getJoltageLocations(bank);
    const largestJoltage = +getLargestJoltagePotential(
      joltageLocations,
      bank.length
    );

    return agg + largestJoltage;
  }, 0)
);
