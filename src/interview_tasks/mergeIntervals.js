function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let currentInterval = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    if (currentInterval[1] >= intervals[i][0]) {
      currentInterval[1] = Math.max(currentInterval[1], intervals[i][1]);
    } else {
      merged.push(currentInterval);
      currentInterval = intervals[i];
    }
  }

  merged.push(currentInterval);

  return merged;
}

const intervals = [
  [2, 6],
  [1, 3],
  [8, 15],
  [17, 18],
];
console.log(mergeIntervals(intervals));
