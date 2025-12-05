import { readFileSync } from "fs";

const data = readFileSync("./input.txt", "utf-8");

const banks = data.split(/\r\n/).map((bank) => bank.split(""));

const getLargestJoltageForGivenCellCount = (
  bank: number[],
  requiredCellCount: number,
  searchFor = 9
) => {
  const bankSize = bank.length;

  if (bankSize <= 0 || searchFor <= 0) {
    return `${searchFor}--`;
  }

  const cellIndex = bank.indexOf(searchFor);
  const found = cellIndex > -1;
  const enoughRemainingCells = bankSize - cellIndex >= requiredCellCount;

  if (requiredCellCount === 1 && found) {
    return searchFor.toString();
  }

  if (found && enoughRemainingCells) {
    return (
      searchFor.toString() +
      getLargestJoltageForGivenCellCount(
        bank.slice(cellIndex + 1),
        requiredCellCount - 1,
        9
      )
    );
  }

  if ((!found && enoughRemainingCells) || (found && !enoughRemainingCells)) {
    return getLargestJoltageForGivenCellCount(
      bank,
      requiredCellCount,
      searchFor - 1
    );
  }
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
  banks.reduce(
    (agg, bank) =>
      agg +
      +getLargestJoltageForGivenCellCount(
        bank.map((x) => +x),
        2
      ),
    0
  )
);


console.log(
  banks.reduce(
    (agg, bank) =>
      agg +
      +getLargestJoltageForGivenCellCount(
        bank.map((x) => +x),
        12
      ),
    0
  )
);