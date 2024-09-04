var arrayy = [
    1,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    6,
    7,
    8,
    9,
    9,
    9,
    "arr",
    "error",
    "arr",
];
function withoutRepeat(arr) {
    var map = new Map();
    var withoutRepeat = arr.filter(function (item, index) {
        return map.has(item) ? false : map.set(item, index);
    });
    return withoutRepeat;
}
console.log(withoutRepeat(arrayy));
