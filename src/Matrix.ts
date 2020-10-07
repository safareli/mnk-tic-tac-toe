export type Matrix<T> = (T | undefined)[][];

export const lookUp = <T>(m: Matrix<T>, pos: Pos): T | undefined => {
  const col = m[pos.x];
  if (col === undefined) {
    return undefined;
  } else {
    return col[pos.y];
  }
};

export const set = <T>(m: Matrix<T>, pos: Pos, value: T) => {
  let col = m[pos.x];
  if (col === undefined) {
    col = [];
    m[pos.x] = col;
  }
  col[pos.y] = value;
};

export type Pos = { x: number; y: number };

export type Direction = { dx: 1 | 0 | -1; dy: 1 | 0 | -1 };

export const move = (pos: Pos, direction: Direction): Pos => {
  return { x: pos.x + direction.dx, y: pos.y + direction.dy };
};

/*



 |-----------|-----------|-----------
 |x -1, y-1  |   x,y-1   |  x +1, y-1
 |-----------|-----------|-----------
 |x -1, y    |   x, y    |  x +1, y
 |-----------|-----------|-----------
 |x -1, y+1  |   x,y+1   |  x +1, y+1
 |-----------|-----------|-----------


*/
const topLeft: Direction = { dx: -1, dy: -1 };
const top: Direction = { dx: 0, dy: -1 };
const topRight: Direction = { dx: +1, dy: -1 };
const left: Direction = { dx: -1, dy: 0 };
const right: Direction = { dx: +1, dy: 0 };
const bottomLeft: Direction = { dx: -1, dy: +1 };
const bottom: Direction = { dx: 0, dy: +1 };
const bottomRight: Direction = { dx: +1, dy: +1 };

const collectInDirectionWhile = <T>(
  from: Pos,
  dir: Direction,
  collect: (pos: Pos) => T | undefined
): T[] => {
  let pos = from;
  const acc = [];
  while (true) {
    pos = move(pos, dir);
    const res = collect(pos);
    if (res === undefined) {
      return acc;
    }
    acc.push(res);
  }
};

export const collectInDiagonalsWhile = <T>(
  from: Pos,
  collect: (pos: Pos) => T | undefined
) => {
  const diagonalCollect = (a: Direction, b: Direction) => [
    ...collectInDirectionWhile(from, a, collect),
    ...collectInDirectionWhile(from, b, collect),
  ];
  return [
    diagonalCollect(top, bottom),
    diagonalCollect(topRight, bottomLeft),
    diagonalCollect(left, right),
    diagonalCollect(topLeft, bottomRight),
  ];
};
