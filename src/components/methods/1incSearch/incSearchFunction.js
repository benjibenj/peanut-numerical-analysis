import * as math from "mathjs";

const incrementalSearch = (functionText, initialValue, delta, maxCount) => {
  let results = [];
  let count = 0;
  let a = {
    x: initialValue
  };
  let b = {
    x: initialValue + delta
  };

  if (maxCount > 100 || maxCount < 0 ) {
    throw Error("max iterations is > 100 o max iterations is < 0");
  } 

  if (delta < 0 ) {
    throw Error("Delta is an incorrect value");
  } 

  let fA = math.evaluate(functionText, a); // we evaluate f(a)
  let fB = math.evaluate(functionText, b); // we evaluate f(b)
  
  
  if (fA.im) { 
    throw Error("f(a) isn´t define in the domine of the function: xi = " + a.x);
  }
  if (fB.im) { 
    throw Error("f(a) isn´t define in the domine of the function: xi = " + b.x);
  } 

  while (count < maxCount) {
    if (fA * fB < 0 || fA * fB === 0)
      results.push(
        "There's a root for the function in [" + a.x + ", " + b.x + "]"
      );

    a.x = b.x;
    fA = fB;
    
    b.x = b.x + delta;
    fB = math.evaluate(functionText, b);
 
  if (fB.im) { 
    throw Error("f(a) isn´t define in the domine of the function xi = " + b.x);
  }
    count += 1;
  }
  if (results.length === 0){
    results.push("No root was found in [" + initialValue + ", " + b.x + "]");
  }
  
  return results;
};

export default incrementalSearch;
