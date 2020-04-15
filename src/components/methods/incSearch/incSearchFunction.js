import * as Algebrite from "algebrite";

const incrementalSearch = (functionText, initialValue, delta, maxCount) => {
  if (maxCount > 100){
    maxCount = 100;
  }
  let count = 0;
  let a = initialValue;
  let b = initialValue + delta;
  let fA = parseFloat(Algebrite.eval(functionText, "x", a).toString()); // we evaluate f(a)
  let fB = parseFloat(Algebrite.eval(functionText, "x", b).toString()); // we evaluate f(b)
  while (fA*fB > 0 && count < maxCount ) {
    a = b;
    fA = fB;
    b = b+delta;
    fB = parseFloat(Algebrite.eval(functionText, "x", b).toString());
    count += 1;
  }
  return [a, b, fA, fB, count];
};

export default incrementalSearch;