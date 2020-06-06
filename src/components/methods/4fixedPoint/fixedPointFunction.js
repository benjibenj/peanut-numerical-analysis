import { format, evaluate, abs } from "mathjs";

const fixedPointFunction = (f, g, x0, tol, maxCount = 100) => {
  let error;
  let count = 0;
  let xN;
  let fX = evaluate(f, { x: x0 });
  let results = {
    iterations: [],
    conclusion: undefined
  };
  if (evaluate(f, { x: x0 }).im) { 
    throw Error("X0 isn´t define in the domine of the function f: x0 = " + x0);
  } 
  if (evaluate(g, { x: x0 }).im) { 
    throw Error("x0 isn´t define in the domine of the function g: x0 = " + x0);
  }
  if (maxCount < 0 ) {
    throw Error("Max iterations is < 0: iterations = " + maxCount);
  } 
  if (f===g) {
    throw Error("Function f has to be different from g");
  } 
  if (fX === 0) {
    results.iterations.push(count, x0, undefined, fX, undefined);
    results.conclusion =
      "x0 is the root : " + format(x0, { notation: "fixed", precision: 15 });
    return results;
  }
  if (tol < 0 ) {
    throw Error("tol is an incorrect value: tol = " + tol);
  } 
  xN = evaluate(g, { x: x0 });
  
  results.iterations.push([
    count,
    format(x0, { notation: "fixed", precision: 10 }),
    format(xN, { notation: "fixed", precision: 10 }),
    format(fX, { notation: "exponential", precision: 2 }),
    null
  ]);
  error = abs(x0 - xN);
  fX = evaluate(f, { x: xN });
  while (error > tol && count < maxCount && fX !== 0) {
    x0 = xN;
    xN = evaluate(g, { x: x0 });
    count += 1;
    results.iterations.push([
      count,
      format(x0, { notation: "fixed", precision: 10 }),
      format(xN, { notation: "fixed", precision: 10 }),
      format(fX, { notation: "exponential", precision: 2 }),
      format(error, { notation: "exponential", precision: 2 })
    ]);
    error = abs(x0 - xN); //error at the current step
    fX = evaluate(f, { x: xN });
  }
  if (fX === 0) {
    x0 = xN;
    xN = evaluate(g, { x: x0 });
    count += 1;
    results.iterations.push([
      count,
      format(x0, { notation: "fixed", precision: 10 }),
      format(xN, { notation: "fixed", precision: 10 }),
      format(fX, { notation: "exponential", precision: 2 }),
      format(error, { notation: "exponential", precision: 2 })
    ]);
    results.conclusion =
      "The root was found for xN = " +
      format(x0, { notation: "fixed", precision: 15 });
    return results;
  } else if (error <= tol) {
    x0 = xN;
    xN = evaluate(g, { x: x0 });
    count += 1;
    results.iterations.push([
      count,
      format(x0, { notation: "fixed", precision: 10 }),
      format(xN, { notation: "fixed", precision: 10 }),
      format(fX, { notation: "exponential", precision: 2 }),
      format(error, { notation: "exponential", precision: 2 })
    ]);
    results.conclusion =
      "An approximation of the root was found for xN = " +
      format(x0, { notation: "fixed", precision: 15 });
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

export default fixedPointFunction;
