import * as math from "mathjs";

const incrementalSearch = (functionText, initialValue, delta, maxCount) => {
  let results = [];
  if (maxCount > 100){
    maxCount = 100;
  }
  let count = 0;
  let a = {
    x: initialValue,
  };
  let b = {
    x: initialValue + delta
  };
  let fA = math.evaluate(functionText, a); // we evaluate f(a)
  let fB = math.evaluate(functionText, b); // we evaluate f(b)
  while (count < maxCount) {
    if(fA*fB < 0) results.push("There's a root for the function in [" + a.x + ", " + b.x + "]");
    a.x = b.x;
    fA = fB;
    b.x = b.x+delta;
    fB = math.evaluate(functionText, b);
    count += 1;
  }
  return results;
};

export default incrementalSearch;