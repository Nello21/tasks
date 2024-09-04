const words = ["flower", "flow", "flight"];

function longestCommonPrefix(strs: string[]): string {
  let prefix = strs[0];

  strs.map((item) => {
    while (!item.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
    if (prefix === "") {
      return prefix;
    }
  });
  return prefix;
}

console.log(longestCommonPrefix(words));
