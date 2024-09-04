const users = [
  {
    name: "alex",
    age: 20,
  },
  {
    name: "Nikita",
    age: "23",
  },
];

users.sort((u1, u2) => {
  return u1.name.localeCompare(u2.name);
});

console.log(users);

const arr = [7, "correct", 0, false, 9, NaN, ""];

const notFalsy = [];

for (let i = 0; i <= arr.length; i++) {
  if (!!arr[i]) {
    notFalsy.push(arr[i]);
  }
}

console.log(notFalsy);

const array = [7, 8, 9, 9, 7, 10, 1, 2, 3, 2];
const map = new Map();
const withoutDuplicates = array.filter((item) => {
  return map.has(item) ? false : map.set(item);
});

console.log(withoutDuplicates);

const getSlicedString = (str) => {
  const resultArray = str.split(", ").reduce((acc, value, index) => {
    if (index % 2 !== 0) {
      acc.push(value.slice(1));
    }
    return acc;
  }, []);
  return resultArray.join(" ");
};

const getFibonacciNumber = (num) => {
  let f1 = 0;
  let f2 = 1;

  for (let i = 2; i <= num; i++) {
    const f3 = f1 + f2;
    f1 = f2;
    f2 = f3;
  }
  return f2;
};

const getSomeData = async (str, num) => {
  const slicedString = Promise.resolve(getSlicedString(str));
  const fibonacci = Promise.resolve(getFibonacciNumber(num));

  const results = await Promise.all([slicedString, fibonacci]).then((data) =>
    console.log(data)
  );

  return results;
};

getSomeData("яблоко, слон, дуб, лес", 3);
