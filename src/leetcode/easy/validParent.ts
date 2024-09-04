function isValid(s: string): boolean {
  const brackets = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  type bracketsType = keyof typeof brackets;

  let bracketsStack = [];

  for (let i = 0; i <= s.length - 1; i++) {
    let currentBracket = s[i];
    if (["(", "{", "["].includes(currentBracket)) {
      bracketsStack.push(currentBracket);
    } else if (
      bracketsStack.pop() !== brackets[currentBracket as bracketsType]
    ) {
      return false;
    }
  }

  return !bracketsStack.length;
}

console.log(isValid("()[]{}"));
