import { format, evaluate, abs } from "mathjs";

const falsePositionFunction = (functionText, a, b, tol, maxCount) => {
  let results = {
    iterations: [],
    conclusion: undefined,
  };
  
  if (maxCount > 100 || maxCount < 0 ) {
    throw Error("max iterations is > 100 o max iterations is < 0: iterations = " + maxCount);
  } 
  if (a >= b) {
    throw Error("a has to be less than b: a = " + a + " ^ b = " + b);
  } 
  if (evaluate(functionText, { x: a }).im) { 
    throw Error("a isn´t define in the domine of the function: a = " + a);
  } 
  if (evaluate(functionText, { x: b }).im) { 
    throw Error("b isn´t define in the domine of the function: b = " + b);
  }
  if(tol < 0 ) {
    throw Error("tol is an incorrect value: tol + " + tol);
  } 

  let count = 1;
  let xR =
    b -
    (evaluate(functionText, { x: b }) * (b - a)) /
      (evaluate(functionText, { x: b }) - evaluate(functionText, { x: a }));

  let fxR = evaluate(functionText, { x: xR }); // we evaluate f(a)
  let error = tol + 1;
  let temp = 0;

  results.iterations.push([
    count,
    format(a, { notation: "fixed", precision: 10 }),
    format(xR, { notation: "fixed", precision: 10 }),
    format(b, { notation: "fixed", precision: 10 }),
    format(fxR, { notation: "exponential", precision: 2 }),
    "",
  ]);

  do {
    if (fxR < 0) {
      a = xR;
    }
    if (fxR > 0) {
      b = xR;
    }

    count += 1;
    temp = xR;
    xR =
      b -
      (evaluate(functionText, { x: b }) * (b - a)) /
        (evaluate(functionText, { x: b }) - evaluate(functionText, { x: a }));
    fxR = evaluate(functionText, { x: xR }); // we evaluate f(a)
    error = abs(xR - temp);
    
  if (evaluate(functionText, { x: a }).im) { 
    throw Error("a isn´t define in the domine of the function: a = " + a);
  } 
  if (evaluate(functionText, { x: b }).im) { 
    throw Error("b isn´t define in the domine of the function: b = " + b);
  }
    results.iterations.push([
      count,
      format(a, { notation: "fixed", precision: 10 }),
      format(xR, { notation: "fixed", precision: 10 }),
      format(b, { notation: "fixed", precision: 10 }),
      format(fxR, { notation: "exponential", precision: 2 }),
      format(error, { notation: "exponential", precision: 2 }),
    ]);
  } while (error > tol && count < maxCount);

  if (error < tol) {
    results.conclusion =
      "An approximation of the root was found for m = " +
      format(xR, { notation: "fixed", precision: 15 });
    return results;
  } else if (error > tol) {
    results.conclusion =
      "Given the number of iterations and the tolerance, it was impossible to find a satisfying root";
    return results;
  } else {
    results.conclusion = "The method exploded";
    return results;
  }
};

export default falsePositionFunction;
