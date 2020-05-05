import { format, evaluate } from "mathjs";

/*
 ESO ES EL CODIGO PARA BISECCION
 NECESITE ADAPTARLO PARA REGLA FALSA
 */


const falsePositionFunction = (functionText, a, b, tol, maxCount) => {
  let results = {
    iterations: [],
    conclusion: undefined,
  };
  if (maxCount > 100) {
    maxCount = 100;
  }
  let count = 1;
  let m = (a + b) / 2;
  let error = m;
  let fA = evaluate(functionText, { x: a }); // we evaluate f(a)
  let fB = evaluate(functionText, { x: b }); // we evaluate f(b)
  let fM = evaluate(functionText, { x: m }); // we evaluate f(m)
  while (error > tol && count < maxCount && fM !== 0 && fA * fB < 0) {
    results.iterations.push([
      count,
      format(a, { notation: "fixed", precision: 10 }),
      format(m, { notation: "fixed", precision: 10 }),
      format(b, { notation: "fixed", precision: 10 }),
      format(fM, { notation: "exponential", precision: 2 }),
      format(error, { notation: "exponential", precision: 2 }),
    ]);
    if (fA * fM < 0) {
      b = m;
      fB = fM;
    } else if (fM * fB < 0) {
      a = m;
      fA = fM;
    }
    m = (a + b) / 2;
    fM = evaluate(functionText, { x: m }); // we evaluate f(m)
    count += 1;
    error = (b-a)/2;
  }
  results.iterations.push([
    count,
    format(a, { notation: "fixed", precision: 10 }),
    format(m, { notation: "fixed", precision: 10 }),
    format(b, { notation: "fixed", precision: 10 }),
    format(fM, { notation: "exponential", precision: 2 }),
    format(error, { notation: "exponential", precision: 2 }),
  ]);
  if (fM === 0) {
    results.conclusion =
      "The root was found for m = " +
      format(m, { notation: "fixed", precision: 15 });
    return results;
  } else if (error <= tol) {
    results.conclusion =
      "An approximation of the root was found for m = " +
      format(m, { notation: "fixed", precision: 15 });
    return results;
  } else if (count === maxCount) {
    results.conclusion =
      "Given the number of iterations and the tolerance, it was impossible to find a satisfying root";
    return results;
  } else {
    results.conclusion =
      "There was an unknown issue";
    return results;
  }
};

export default falsePositionFunction;
