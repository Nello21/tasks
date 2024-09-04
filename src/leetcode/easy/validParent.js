function isValid(s) {
  var brackets = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  var bracketsStack = [];
  for (var i = 0; i <= s.length - 1; i++) {
    var currentBracket = s[i];
    if (["(", "{", "["].includes(currentBracket)) {
      bracketsStack.push(currentBracket);
    } else if (bracketsStack.pop() !== brackets[currentBracket]) {
      return false;
    }
  }
  console.log(bracketsStack.length);
  return !bracketsStack.length;
}
console.log(isValid("()[]{}"));
