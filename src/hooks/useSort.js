let reA = /[^a-zA-Z]/g;
let reN = /[^0-9]/g;
function sortAlphaNum(a, b) {
  var aA = a.name.replace(reA, "");
  var bA = b.name.replace(reA, "");
  if (aA === bA) {
    var aN = parseInt(a.name.replace(reN, ""), 10);
    var bN = parseInt(b.name.replace(reN, ""), 10);
    return aN === bN ? 0 : aN > bN ? 1 : -1;
  } else {
    return aA > bA ? 1 : -1;
  }
}
export default sortAlphaNum