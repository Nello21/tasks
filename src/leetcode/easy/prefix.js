var words = ["flower", "flow", "flight"];
function longestCommonPrefix(strs) {
    var prefix = strs[0];
    strs.map(function (item) {
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
