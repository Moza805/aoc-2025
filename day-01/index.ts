import { readFileSync } from "fs";

const protocols = readFileSync("./input.txt", "utf-8");

const startAt = 50;
const ticks = 100;

var moves: Tick[] = protocols
  .split(/\r\n/)
  .reduce((agg: Tick[], inputMove: string, index: number) => {
    const startsAt = agg[index - 1]?.endsAt ?? startAt;
    const move =
      inputMove[0] === "L" ? +inputMove.slice(1) * -1 : +inputMove.slice(1);

    const diff = startsAt + move;

    let endsAt = diff % ticks;

    const crossesZero = (diff <= 0 || diff >= 100) && startsAt !== 0;
    const zeroCrossCount = Math.abs(Math.floor(diff / ticks));

    if (endsAt < 0) {
      endsAt += 100;
    }

    return [...agg, { startsAt, move, endsAt, zeroCrossCount }];
  }, []);

console.log(moves);

console.log(moves.filter((move) => move.endsAt === 0).length);
console.log(
  moves.reduce(
    (zeroCrossCount, move) => (zeroCrossCount += move.zeroCrossCount),
    0
  )
);

type Tick = {
  zeroCrossCount: number;
  endsAt: number;
  move: number;
  startsAt: number;
};
