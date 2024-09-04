const arrayy = [
  1,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  6,
  7,
  8,
  9,
  9,
  9,
  "arr",
  "error",
  "arr",
];

type arr = typeof arrayy;

function withoutRepeat(arr: arr): arr {
  const map = new Map();

  const withoutRepeat = arr.filter((item: string | number, index: number) => {
    return map.has(item) ? false : map.set(item, index);
  });

  return withoutRepeat;
}

console.log(withoutRepeat(arrayy));
