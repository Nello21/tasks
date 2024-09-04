const createCountDown = (start) => {
  let current = start;

  return () => {
    if (current >= 0) {
      return --current;
    } else {
      return 0;
    }
  };
};

const countDown = createCountDown(5);

console.log(countDown()); // 5
console.log(countDown()); // 4
console.log(countDown()); // 3
console.log(countDown()); // 2
console.log(countDown()); // 1
console.log(countDown()); // 0
console.log(countDown()); // 0
