/*
Задача 1
Написать функцию flattenWords(dict) для вывода слов в консоль в алфавитном порядке из с дерева - словаря. 
Ключами словаря могут быть только английские буквы a-z.
Функция не должна использовать внешние переменные и должна возвращать корректный результат при многократном использовании.
Длина слов может быть до 100000 символов

const dict1 = { f: { o: { o: null } } };
flattenWords(dict1); // foo;

const dict2 = {
  a: {
    c: {
      t: null,
    },
    p: {
      p: {
        e: {
          n: {
            d: null,
          }
        },
      l: {
        e: null,
       }
     }
   }
 }
}
flattenWords(dict2); // act append apple; 
*/

interface LettersDict {
  [char: string]: LettersDict | null;
}

const flattenWords = (dict: LettersDict): string => {
  const collectLetters = (dict: LettersDict, prefix: string) => {
    let words: string[] = [];

    for (const key in dict) {
      const node = dict[key];
      if (node === null) words.push(prefix + key);
      else {
        words = words.concat(collectLetters(node, prefix + key));
      }
    }
    return words;
  };

  const words = collectLetters(dict, "").sort();

  return words.join(" ");
};

const stackFlattenWords = (dict: LettersDict): string => {
  const stack: [LettersDict, string][] = [[dict, ""]];
  const words: string[] = [];

  while (stack.length > 0) {
    const item = stack.pop();
    if (!item) continue;

    const [currentDict, prefix] = item;

    for (const key in currentDict) {
      const node = currentDict[key];
      const newPrefix = prefix + key;

      if (node === null) {
        words.push(newPrefix);
      } else {
        stack.push([node, newPrefix]);
      }
    }
  }

  return words.sort().join(" ");
};

/*
Задача 2
Мы хотим найти все целые числа x, y (x > = 0, y > = 0) решения уравнения вида:
x^2 - 4 * y^2 = n
(где неизвестными являются x и y, а n - заданное положительное число) в порядке убывания положительного xi.
Если решения нет, верните []
Алгоритм должен работать хотя бы за линейное время O(n) или быстрее

Примеры:
solve(5); // [[3, 1]] поскольку x^2 - 4 * y^2 = 5; x=3; y=1
solve(12); // [[4, 1]]
solve(13); // [[7, 3]]
solve(16); // [[4, 0]]
solve(90005); // [[45003, 22501], [9003, 4499], [981, 467], [309, 37]]
solve(90002); // []
*/

const solve = (num: number): number[][] => {
  const results = [];

  for (let a = 1; a <= num; a++) {
    if (num % a === 0) {
      const b = num / a;

      const x = (a + b) / 2;
      const y = (b - a) / 4;

      if (Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0) {
        results.push([x, y]);
      }
    }
  }

  return results;
};

/*
Задача 3
Композиция функций - это мощный инструмент для работы, например:
const add = (x, y) => x + y;
const double = (x) => add(x, x);
double(add(2, 3)); // 10

Но в сложных выражениях композитные функции могут быть сложны для понимания, например: double(double(add(7, add(add(5, add(4, 5)), 4))))); // 100
Куда удобнее было бы применять эти операции последовательно, слева направо, например:
s.add(4,5).add(5).add(4).add(7).double().double().calculate(); // 100

Ваша задача реализовать 'sequence' функцию:

let s = sequence({ add, double });

Как вы можете видеть, эта функция принимает объект с методами add и double и возвращает объект, который позволяет вам вызывать ваши методы цепочкой. 
Результат можно получить, вызвав метод 'calculate()'.
Методы в цепочке принимают определенное количество аргументов. Первая функция в этой цепочке получает все аргументы. 
В последующих функциях первый аргумент - результат выполнения предыдущей функции, а остальные передаются вручную.

Стоит учесть, что цепочки могут быть переиспользованы:

s.add(3, 4).calculate(); // 7
s.add(1, 2).calculate(); // 3

Ещё примеры:
let s1 = s.add(1, 2); s1.calculate(); // == add(1, 2) == 3
s1.double().calculate(); // == double(add(1, 2)) == 6
s1.add(1).calculate(); // == add(add(1, 2), 1) == 4
s1.calculate(); // == add(1, 2) == 3

let s2 = s1.add(5); s2.double().calculate(); // == double(add(add(1, 2), 5)) == 16
s2.add(3).calculate(); // == add(s1.add(add(1, 2), 5), 3) == 11
s2.calculate(); // == add(add(1, 2), 5) == 8
s1.calculate(); // == add(1, 2) == 3

Все приведенные примеры основаны на реализации add и double как функций сложения и удвоения численных аргументов для удобства отладки. 
Однако передача функций add и double параметрами в sequence позволяет абстрагироваться от их реализации. 
В sequence могут быть переданы функции add и double оперирующие строками или более сложными объектами.
*/

type GenericMethods<T> = {
  add: (a: T, b: T) => T;
  double: (a: T) => T;
};
type Sequence<T> = {
  add: (a: T, b?: T) => Sequence<T>;
  double: (b?: T) => Sequence<T>;
  calculate: () => T;
};

const sequence = <T>({ add, double }: GenericMethods<T>): Sequence<T> => {
  let currentValue: T | undefined;
  let operations: ((arg: T) => T)[] = [];

  const sequenceObject: Sequence<T> = {
    add: (a, b) => {
      if (b !== undefined) {
        currentValue = add(a, b);
      } else {
        operations.push((currentValue) => add(currentValue, a));
      }
      return sequenceObject;
    },
    double: () => {
      operations.push((currentValue) => double(currentValue));
      return sequenceObject;
    },
    calculate: () => {
      if (currentValue === undefined) {
        throw new Error("Initial value is not set.");
      }
      const result = operations.reduce(
        (acc: T, operation: (arg: T) => T) => operation(acc),
        currentValue
      );
      operations = [];
      return result;
    },
  };

  return sequenceObject;
};

/*
Задача 4
Есть задача: на resize окна выполнять не очень дешёвый обработчик, т. к. resize генерирует 
большое количество событий, хотелось бы их «проредить», и выполнять обработчик не чаще 
одного раза за указанный интервал времени.

Важная особенность - если заглушенный вызов последний, 
т.е. после него до окончания последнего интервала ничего нет – то он не игнорируется.

Надо имплементировать функцию regulator(func, interval, context), которая вернёт обертку, которую мы 
можем назначить в качестве onWindowResize, где func — функция, которая будет вызываться не чаще 
чем раз в interval мс с context в качестве контекста исполнения.

// пример для interval === 100
// . вызовы regulatedFunc
// ! вызовы func

//................
//!         !          !
//0ms      100ms      200ms
//.    .         .
//!         !          !
//0ms      100ms      200ms

function test() {
    function log(text) {
        console.log(`${this.name}: ${text}`);
    }

    const regulatedFunc = regulator(log, 100, { name: 'me' });

    setTimeout(() => regulatedFunc('a'), 0);
    setTimeout(() => regulatedFunc('b'), 56);
    setTimeout(() => regulatedFunc('c'), 98);
    setTimeout(() => regulatedFunc('d'), 107);
    setTimeout(() => regulatedFunc('e'), 115);
    //   0ms: me logged a
    // 100ms: me logged c
    // 200ms: me logged e
}
*/

// const regulator = (
//   func: (text: string) => void,
//   interval: number,
//   context: any
// ): ((text: string) => void) => {
//   let lastCall = 0;
//   let timeoutId: ReturnType<typeof setTimeout> | null = null;
//   let queuedCalls: string[] = [];

//   const executeNextCall = () => {
//     if (queuedCalls.length > 0) {
//       const nextCall = queuedCalls.shift();
//       if (nextCall) {
//         func.apply(context, [nextCall]);
//         lastCall = Date.now();
//       }
//     }
//   };

//   const throttledFunction = (text: string) => {
//     const now = Date.now();
//     const timeSinceLastCall = now - lastCall;

//     if (timeSinceLastCall >= interval) {
//       clearTimeout(timeoutId);
//       func.apply(context, [text]);
//       lastCall = now;
//     } else {
//       if (timeoutId === null) {
//         const remainingTime = interval - timeSinceLastCall;
//         timeoutId = setTimeout(() => {
//           executeNextCall();
//           timeoutId = null;
//         }, remainingTime);
//       }
//       queuedCalls.push(text);
//     }
//   };

//   return throttledFunction;
// };

// ТЕСТЫ ДЛЯ ВСЕХ ЗАДАЧ
let allTestsArePassed = true;
type Result = string | number | any[];
const assert = (actual: Result, expected: Result) => {
  if (
    (Array.isArray(expected) && !Array.isArray(actual)) ||
    (Array.isArray(expected) &&
      Array.isArray(actual) &&
      expected?.toString() !== actual?.toString())
  ) {
    console.warn("Test failed", { expected, actual });
    allTestsArePassed = false;
    return;
  }

  if (
    !Array.isArray(expected) &&
    !Array.isArray(actual) &&
    expected !== actual
  ) {
    allTestsArePassed = false;
    console.warn("Test failed", { expected, actual });
  }
};

// Задача 1
assert(flattenWords({ f: { o: { o: null } } }), "foo");
assert(
  flattenWords({
    a: { c: { t: null }, p: { p: { e: { n: { d: null } }, l: { e: null } } } },
  }),
  "act append apple"
);
assert(stackFlattenWords({ f: { o: { o: null } } }), "foo");
assert(
  stackFlattenWords({
    a: { c: { t: null }, p: { p: { e: { n: { d: null } }, l: { e: null } } } },
  }),
  "act append apple"
);

// Задача 2
assert(solve(5), [[3, 1]]);
assert(solve(12), [[4, 1]]);
assert(solve(13), [[7, 3]]);
assert(solve(16), [[4, 0]]);
assert(solve(90005), [
  [45003, 22501],
  [9003, 4499],
  [981, 467],
  [309, 37],
]);
assert(solve(90002), []);

// Задача 3
const add = (x: number, y: number) => x + y;
const double = (x: number) => add(x, x);
let s = sequence({ add, double });
assert(s.add(3, 4).calculate(), 7);
assert(s.add(1, 2).calculate(), 3);
let s1 = s.add(1, 2);
assert(s1.calculate(), 3);
assert(s1.double().calculate(), 6);

// Тест задачи 4
// const test = () => {
//   let logOutput: string[] = [];
//   function log(this: { name: string }, text: string) {
//     logOutput.push(`${this.name}: ${text}`);
//   }

//   const regulatedFunc = regulator(log, 100, { name: "me" });

//   setTimeout(() => regulatedFunc("a"), 0);
//   setTimeout(() => regulatedFunc("b"), 56);
//   setTimeout(() => regulatedFunc("c"), 98);
//   setTimeout(() => regulatedFunc("d"), 107);
//   setTimeout(() => regulatedFunc("e"), 115);

//   setTimeout(() => {
//     assert(logOutput, ["me: a", "me: c", "me: e"]);
//   }, 300);
// };

// test();

// ИТОГ ОТКРЫТЫХ ТЕСТОВ
if (allTestsArePassed) {
  console.log("Congrats, all visible tests are passed!");
}

// СКРЫТЫЕ ТЕСТЫ
const regulator = (
  func: (text: string) => void,
  interval: number,
  context: any
): ((text: string) => void) => {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const executeCall = (text: string) => {
    clearTimeout(timeoutId);
    func.call(context, text);
    lastCall = Date.now();
    timeoutId = setTimeout(() => {}, interval);
  };

  const throttledFunction = (text: string) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= interval || !timeoutId) {
      executeCall(text);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => executeCall(text),
        interval - timeSinceLastCall
      );
    }
  };

  return throttledFunction;
};

function test() {
  function log(text: string) {
    console.log(`${this.name}: ${text}`);
  }

  const regulatedFunc = regulator(log, 100, { name: "me" });

  setTimeout(() => regulatedFunc("a"), 0);
  setTimeout(() => regulatedFunc("b"), 56);
  setTimeout(() => regulatedFunc("c"), 98);
  setTimeout(() => regulatedFunc("d"), 107);
  setTimeout(() => regulatedFunc("e"), 115);
  // Expected output:
  //   0ms: me logged a
  // 100ms: me logged c
  // 200ms: me logged e
}

test();
