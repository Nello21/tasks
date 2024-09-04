Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => {
    throw x;
  })
  .then((x) => console.log("1", x))
  .catch((err) => console.log("2", err))
  .then((x) => Promise.resolve(1))
  .catch((err) => console.log("3", err))
  .then((x) => console.log("4", x));
