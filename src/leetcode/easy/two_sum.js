function twoSum(nums, target) {
  if (nums.length > (10 ^ 4) || nums.length < 2) {
    console.log("invalid data");
  } else {
    var arr = [];
    for (var i = 0; i < nums.length; i++) {
      if (nums.includes(target - nums[i])) {
        if (target - nums[i] === nums[i]) {
          console.log(nums[i]);
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
    console.log(arr);
    return arr;
  }
}
var target = 6;
var nums = [3, 3];
twoSum(nums, target);
