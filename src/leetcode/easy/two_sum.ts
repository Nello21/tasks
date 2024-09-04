function twoSum(nums: number[], target: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums.includes(target - nums[i])) {
      if (target - nums[i] === nums[i]) {
        if (nums.indexOf(target - nums[i], i + 1) === -1) {
          continue;
        } else {
          arr.push(i);
          arr.push(nums.indexOf(target - nums[i], i + 1));
          break;
        }
      }
      arr.push(i);
      arr.push(nums.indexOf(target - nums[i]));
      break;
    }
  }

  return arr;
}

const target = 6;
const nums = [3, 2, 4];

twoSum(nums, target);
