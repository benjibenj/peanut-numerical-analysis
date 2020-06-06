import { format, evaluate, abs } from "mathjs";

const bisectionFunction = (functionText, a, b, tol, maxCount) => {
  let results = {
    iterations: [],
    conclusion: undefined
  };
  if (maxCount < 0 ) {
    throw Error("Max iterations is < 0: iteration = " + maxCount);
  } 
  if (evaluate(functionText, { x: a }).im) { 
    throw Error("a isn´t define in the domine of the function: a = " + a);
  } 
  if (evaluate(functionText, { x: b }).im) { 
    throw Error("b isn´t define in the domine of the function: b = " + b);
  }
  if (a >= b) {
    throw Error("a has to be less than b: a = " + a  +" ^ b = " + b);
  } 

  if (tol < 0 ) {
    throw Error("tol is an incorrect value: tol = " + tol);
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
      format(error, { notation: "exponential", precision: 2 })
    ]);
    if (fA.im) { 
      throw Error("f(a) isn´t define in the domine of the function: a = " + a);
    } 
    if (fB.im) { 
      throw Error("f(b) isn´t define in the domine of the function: b = " + b);
    }
    if (fM.im) { 
      throw Error("f((a+b)/2) isn´t define in the domine of the function: (a+b)/2 = " + m);
    }

    if (fA * fM < 0) {
      b = m;
      fB = fM;
    } else if (fM * fB < 0) {
      a = m;
      fA = fM;
    }
    m = abs((a + b) / 2);
    fM = evaluate(functionText, { x: m }); // we evaluate f(m)

    count += 1;
    error = (b - a) / 2;
  }
  results.iterations.push([
    count,
    format(a, { notation: "fixed", precision: 10 }),
    format(m, { notation: "fixed", precision: 10 }),
    format(b, { notation: "fixed", precision: 10 }),
    format(fM, { notation: "exponential", precision: 2 }),
    format(error, { notation: "exponential", precision: 2 })
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
  } else if (count < maxCount && error > tol) {
    throw Error("There was no found a root in the interval of the function");
   
  }else if (count === maxCount) {
    results.conclusion =
      "Given the number of iterations and the tolerance, it was impossible to find a satisfying root";
    return results;
  } else {
    results.conclusion = "The method exploded";
    return results;
  }
};

export default bisectionFunction;
