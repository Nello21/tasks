const Incrementor = (initialValue) => {
  let value = initialValue || 0;

  return () => ++value;
};

var increment = new Incrementor(0);

console.log(increment); // 1
console.log(increment); // 2
console.log(increment); //
