function isPalindrome(x) {
  if (x < 0) return false;
  var reverseNumber = x.toString().split("").reverse().join("");
  return x === parseInt(reverseNumber);
}

console.log(isPalindrome(22122));
