const arr1 = [1, 2, 4, 6];
const arr2 = [3, 5, 6];

function mergeTwoArrays(arr1, arr2) {
  const merged = [];

  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }

  return merged;
}

console.log(mergeTwoArrays(arr1, arr2));
