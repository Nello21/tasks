const roman = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

type romanDigits = keyof typeof roman;

function romanToInt(s: string): number {
  const integers = s.split("").map((c) => roman[c as romanDigits]);

  return integers.reduce(
    (acc, item, i) => (item < integers[i + 1] ? acc - item : acc + item),
    0
  );
}

console.log(romanToInt("XIV"));
