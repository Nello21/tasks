function twoSum(nums, target) {
  var numberMap = new Map();
  for (var i = 0; i <= nums.length; i++) {
    var number = nums[i];
    var difference = target - number;
    if (numberMap.has(difference)) {
      console.log("он имеет", [numberMap.get(difference), i]);
      return [numberMap.get(difference), i];
    }
    numberMap.set(number, i);
    console.log("он имеет", number, i);
  }
}

twoSum([3, 3], 6);
