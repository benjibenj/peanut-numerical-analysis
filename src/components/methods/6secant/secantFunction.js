import { format, evaluate, abs } from "mathjs";

const secantFunction = (f, x0, x1, tol = 10e-7, maxCount = 100) => {
  let error;
  let count = 0;
  let fX0 = evaluate(f, { x: x0 });
  let fX1 = evaluate(f, { x: x1 });
  let xN = x1 - (fX1 * (x1 - x0)) / (fX1 - fX0);
  let fXN = evaluate(f, { x: xN });
  let results = {
    iterations: [],
    conclusion: undefined
  };
  if (evaluate(f, { x: x0 }).im) { 
    throw Error("x0 isn´t define in the domine of the function f: x0 = " + x0);
  } 
  if (maxCount < 0 ) {
    throw Error("Max iterations is < 0: iterations = " + maxCount);
  } 
  if (tol < 0 ) {
    throw Error("tol is an incorrect value: tol = " + tol);
  } 
  if (x0 === x1) {
    throw Error("x0 is equal to x1: x0 = " + x0 + " ^ x1 = " + x1);
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
  count += 1;
  results.iterations.push([
    count,
    format(x1, { notation: "fixed", precision: 10 }),
    format(fX1, { notation: "exponential", precision: 2 }),
    undefined
  ]);
  if (fX1 === 0) {
    results.conclusion =
      "x" +
      count +
      " is the root : " +
      format(x1, { notation: "fixed", precision: 15 });
    return results;
  }
  count += 1;
  error = abs(x1 - xN);
  results.iterations.push([
    count,
    format(xN, { notation: "fixed", precision: 10 }),
    format(fXN, { notation: "exponential", precision: 2 }),
    format(error, { notation: "exponential", precision: 2 })
  ]);
  if (fXN === 0) {
    results.conclusion =
      "x" +
      count +
      " is the root : " +
      format(xN, { notation: "fixed", precision: 15 });
    return results;
  }
  while (error > tol && count < maxCount && fXN !== 0) {
    x0 = x1;
    x1 = xN;
    fX0 = evaluate(f, { x: x0 });
    fX1 = evaluate(f, { x: x1 });
    if (fX1 - fX0 !== 0) {
      xN = x1 - (fX1 * (x1 - x0)) / (fX1 - fX0);
      error = abs(x1 - xN); //error at the current step
      count += 1;
      results.iterations.push([
        count,
        format(xN, { notation: "fixed", precision: 10 }),
        format(fXN, { notation: "exponential", precision: 2 }),
        format(error, { notation: "exponential", precision: 2 })
      ]);
    } else {
      results.conclusion =
        "The denominator is 0, the method cannot be continued. The last approximate root found is " +
        format(xN, { notation: "fixed", precision: 15 }) +
        " with an error of " +
        format(error, { notation: "exponential", precision: 2 });
      return results;
    }
  }
  if (fXN === 0) {
    results.conclusion =
      "The root was found for xN = " +
      format(xN, { notation: "fixed", precision: 15 });
    return results;
  } else if (error <= tol) {
    results.conclusion =
      "An approximation of the root was found for xN = " +
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

export default secantFunction;
