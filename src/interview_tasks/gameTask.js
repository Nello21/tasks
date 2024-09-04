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
var flattenWords = function (dict) {
    var collectLetters = function (dict, prefix) {
        var words = [];
        for (var key in dict) {
            var node = dict[key];
            if (node === null)
                words.push(prefix + key);
            else {
                words = words.concat(collectLetters(node, prefix + key));
            }
        }
        return words;
    };
    var words = collectLetters(dict, "").sort();
    return words.join(" ");
};
var stackFlattenWords = function (dict) {
    var stack = [[dict, ""]];
    var words = [];
    while (stack.length > 0) {
        var item = stack.pop();
        if (!item)
            continue;
        var currentDict = item[0], prefix = item[1];
        for (var key in currentDict) {
            var node = currentDict[key];
            var newPrefix = prefix + key;
            if (node === null) {
                words.push(newPrefix);
            }
            else {
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
var solve = function (num) {
    var results = [];
    for (var a = 1; a <= num; a++) {
        if (num % a === 0) {
            var b = num / a;
            var x = (a + b) / 2;
            var y = (b - a) / 4;
            if (Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0) {
                results.push([x, y]);
            }
        }
    }
    return results;
};
var sequence = function (_a) {
    var add = _a.add, double = _a.double;
    var currentValue;
    var operations = [];
    var sequenceObject = {
        add: function (a, b) {
            if (b !== undefined) {
                currentValue = add(a, b);
            }
            else {
                operations.push(function (currentValue) { return add(currentValue, a); });
            }
            return sequenceObject;
        },
        double: function () {
            operations.push(function (currentValue) { return double(currentValue); });
            return sequenceObject;
        },
        calculate: function () {
            if (currentValue === undefined) {
                throw new Error("Initial value is not set.");
            }
            var result = operations.reduce(function (acc, operation) { return operation(acc); }, currentValue);
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
var allTestsArePassed = true;
var assert = function (actual, expected) {
    if ((Array.isArray(expected) && !Array.isArray(actual)) ||
        (Array.isArray(expected) &&
            Array.isArray(actual) &&
            (expected === null || expected === void 0 ? void 0 : expected.toString()) !== (actual === null || actual === void 0 ? void 0 : actual.toString()))) {
        console.warn("Test failed", { expected: expected, actual: actual });
        allTestsArePassed = false;
        return;
    }
    if (!Array.isArray(expected) &&
        !Array.isArray(actual) &&
        expected !== actual) {
        allTestsArePassed = false;
        console.warn("Test failed", { expected: expected, actual: actual });
    }
};
// Задача 1
assert(flattenWords({ f: { o: { o: null } } }), "foo");
assert(flattenWords({
    a: { c: { t: null }, p: { p: { e: { n: { d: null } }, l: { e: null } } } },
}), "act append apple");
assert(stackFlattenWords({ f: { o: { o: null } } }), "foo");
assert(stackFlattenWords({
    a: { c: { t: null }, p: { p: { e: { n: { d: null } }, l: { e: null } } } },
}), "act append apple");
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
var add = function (x, y) { return x + y; };
var double = function (x) { return add(x, x); };
var s = sequence({ add: add, double: double });
assert(s.add(3, 4).calculate(), 7);
assert(s.add(1, 2).calculate(), 3);
var s1 = s.add(1, 2);
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
var regulator = function (func, interval, context) {
    var lastCall = 0;
    var timeoutId;
    var executeCall = function (text) {
        clearTimeout(timeoutId);
        func.call(context, text);
        lastCall = Date.now();
        timeoutId = setTimeout(function () { }, interval);
    };
    var throttledFunction = function (text) {
        var now = Date.now();
        var timeSinceLastCall = now - lastCall;
        if (timeSinceLastCall >= interval || !timeoutId) {
            executeCall(text);
        }
        else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () { return executeCall(text); }, interval - timeSinceLastCall);
        }
    };
    return throttledFunction;
};
function test() {
    function log(text) {
        console.log("".concat(this.name, ": ").concat(text));
    }
    var regulatedFunc = regulator(log, 100, { name: "me" });
    setTimeout(function () { return regulatedFunc("a"); }, 0);
    setTimeout(function () { return regulatedFunc("b"); }, 56);
    setTimeout(function () { return regulatedFunc("c"); }, 98);
    setTimeout(function () { return regulatedFunc("d"); }, 107);
    setTimeout(function () { return regulatedFunc("e"); }, 115);
    // Expected output:
    //   0ms: me logged a
    // 100ms: me logged c
    // 200ms: me logged e
}
test();
