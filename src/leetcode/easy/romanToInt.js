var roman = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};
function romanToInt(s) {
  var integers = s.split("").map((c) => {
    return roman[c];
  });
  return integers.reduce((acc, item, i) => {
    return item < integers[i + 1] ? acc - item : acc + item;
  }, 0);
}

console.log(romanToInt("XIV"));
