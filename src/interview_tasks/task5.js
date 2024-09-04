function sumOfDigits(number) {
  return number
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit));
}

function printNumbers() {
  for (let i = 0; i <= 1000; i++) {
    if (i % 3 === 0 && i % 5 !== 0 && sumOfDigits(i) < 10) {
      console.log(i);
    }
  }
}

printNumbers();
