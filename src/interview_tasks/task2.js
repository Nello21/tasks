const taskFunction = (a, b) => {
  if (a % 2 === 0 && b % 2 === 0) {
    console.log(a * b);
  } else if (a % 2 != 0 && b % 2 != 0) {
    console.log(a + b);
  } else console.log(a || b);
};

taskFunction(2, 1);
