import { format, evaluate, abs } from "mathjs";

const newtonFunction = (f, derivative, x0, tol = 10e-7, maxCount = 100) => {
  let error;
  let count = 0;
  let fX0 = evaluate(f, { x: x0 });
  let results = {
    iterations: [],
    conclusion: undefined
  };
  if (maxCount > 100 || maxCount < 0 ) {
    throw Error("max iterations is > 100 o max iterations is < 0: iterations = " + maxCount);
  } 
  if (tol < 0 ) {
    throw Error("tol is an incorrect value: tol = " + tol);
  } 
  if (evaluate(f, { x: x0 }).im) { 
    throw Error("x0 isn´t define in the domine of the function f: x0 = " + x0);
  } 

  results.iterations.push([
    count,
    format(x0, { notation: "fixed", precision: 10 }),
    format(fX0, { notation: "exponential", precision: 2 }),
    undefined
  ]);
  if (fX0 === 0) {
    results.conclusion =
      "x" +
      count +
      " is the root : " +
      format(x0, { notation: "fixed", precision: 15 });
    return results;
  }
  let derivativeX0 = evaluate(derivative, { x: x0 });

  if (derivativeX0 === 0) {
    throw Error("The point evaluated in the derivative must be different from 0");
  } 

  let xN = x0 - fX0 / derivativeX0;
  let fXN = evaluate(f, { x: xN });
  count += 1;
  error = abs(x0 - xN);
  results.iterations.push([
    count,
    format(xN, { notation: "fixed", precision: 10 }),
    format(fXN, { notation: "exponential", precision: 2 }),
    format(error, { notation: "exponential", precision: 2 })
  ]);
  while (error > tol && count < maxCount && fXN !== 0) {
    x0 = xN;
    fX0 = fXN;
    derivativeX0 = evaluate(derivative, { x: x0 });
    xN = xN = x0 - fX0 / derivativeX0;
    error = abs(x0 - xN); //error at the current step
    fXN = evaluate(f, { x: xN });
    count += 1;
    if (derivativeX0.im) { 
      throw Error("xi isn´t define in the domine of the derivate f: xi = " + x0);
    } 
    if (fXN.im) { 
      throw Error("xi isn´t define in the domine of the function f: xi = " + xN);
    } 
    results.iterations.push([
      count,
      format(xN, { notation: "fixed", precision: 10 }),
      format(fXN, { notation: "exponential", precision: 2 }),
      format(error, { notation: "exponential", precision: 2 })
    ]);
  }
  if (fXN === 0) {
    results.conclusion =
      "The root was found for x " +
      count +
      "  = " +
      format(xN, { notation: "fixed", precision: 15 });
    return results;
  } else if (error <= tol) {
    results.conclusion =
      "An approximation of the root was found for x" +
      count +
      " = " +
      format(xN, { notation: "fixed", precision: 15 });
    return results;
  } else if (count === maxCount) {
    results.conclusion =
      "Given the number of iterations and the tolerance, it was impossible to find a satisfying root";
    return results;
  } else {
    results.conclusion = "The method exploded";
    return results;
  }
};

export default newtonFunction;
