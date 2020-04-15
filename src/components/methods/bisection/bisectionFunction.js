import * as Algebrite from "algebrite";

const bisectionFunction = (functionText, a, b, tol, maxCount) => {
  if (maxCount > 100) {
    maxCount = 100;
  }
  let count = 1;
  let m = (a + b) / 2;
  let error = m;
  let fA = parseFloat(Algebrite.eval(functionText, "x", a).toString()); // we evaluate f(a)
  let fB = parseFloat(Algebrite.eval(functionText, "x", b).toString()); // we evaluate f(b)
  let fM = parseFloat(Algebrite.eval(functionText, "x", m).toString()); // we evaluate f(m)
  while (error > tol && count < maxCount && fM !== 0 && fA * fB < 0) {
    if (fA * fM < 0) {
      b = m;
      fB = fM;
      m = (a + b) / 2;
      fM = parseFloat(Algebrite.eval(functionText, "x", m).toString()); // we evaluate f(m)
      count += 1;
      error = (a + b) / 2 ** count;
    } else if (fM * fB < 0) {
      a = m;
      fA = fM;
      m = (a + b) / 2;
      fM = parseFloat(Algebrite.eval(functionText, "x", m).toString()); // we evaluate f(m)
      count += 1;
      error = (a + b) / 2 ** count;
    }
  }
  if (fM === 0) {
    return [a, b, m, fA, fB, error, count, "m is the root"];
  } else if (error <= tol) {
    return [a, b, m, fA, fB, error, count, "The root has been found"];
  } else if (count === maxCount) {
    return [
      a,
      b,
      m,
      fA,
      fB,
      error,
      count,
      "The max number of iterations has been reached",
    ];
  } else {
    return [a, b, m, fA, fB, error, count, "?? Not supposed to happen ??"];
  }
};

export default bisectionFunction;