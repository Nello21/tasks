function isPalindrome(x: number): boolean {
  if (x < 0) return false;
  const reverseNumber: string = x.toString().split("").reverse().join("");
  return x === parseInt(reverseNumber);
}

console.log(isPalindrome(22122));
