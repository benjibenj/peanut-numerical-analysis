import { format, evaluate, abs, pow } from "mathjs";

const multipleRootsFunction = (
  funct,
  firstDerivate,
  secondDerivate,
  x0,
  tol = 10e-7,
  maxCount = 100
) => {
  let results = {
    iterations: [],
    conclusion: undefined
  };
  if (evaluate(funct, { x: x0 }).im) { 
    throw Error("x0 isn´t define in the domine of the function f: x0 = " + x0);
  } 
  if (maxCount > 100 || maxCount < 0 ) {
    throw Error("max iterations is > 100 o max iterations is < 0: iterations = " + maxCount);
  } 
  if (tol < 0 ) {
    throw Error("tol is an incorrect value: tol = " + tol);
  } 

  let fX = evaluate(funct, { x: x0 }); // we evaluate f(a)
  let fXP = evaluate(firstDerivate, { x: x0 });
  let fXS = evaluate(secondDerivate, { x: x0 });
  let err = tol + 1;
  let d = pow(fXP, 2) - fX * fXS;

  let cont = 0;

  results.iterations.push([
    cont,
    format(x0, { notation: "fixed", precision: 10 }),
    format(fX, { notation: "exponential", precision: 2 }),
    ""
  ]);

  let xEv;

  do {
    xEv = x0 - (fX * fXP) / (pow(fXP, 2) - fX * fXS);
    if(xEv === Infinity){
      throw Error("Infinity value in step " + cont);
    }

    console.log(xEv);
    fX = evaluate(funct, { x: xEv });

    fXP = evaluate(firstDerivate, { x: xEv });
    fXS = evaluate(secondDerivate, { x: xEv });
    err = abs(xEv - x0);
    cont += 1;
    if (fX.im) { 
      throw Error("xi isn´t define in the domine of the function: xi = " + xEv);
    } 
    if (fXP.im) { 
      throw Error("xi isn´t define in the domine of the first derivate: xi = " + xEv);
    } 
    if (fXS.im) { 
      throw Error("xi isn´t define in the domine of the second derivate: xi = " + xEv);
    }

    x0 = xEv;
    results.iterations.push([
      cont,
      format(x0, { notation: "exponential", precision: 10 }),
      format(fX, { notation: "exponential", precision: 2 }),
      format(err, { notation: "exponential", precision: 2 })
    ]);
  } while (err > tol && d !== 0 && cont < maxCount);

  if (fX === 0) {
    results.conclusion =
      "The root was found for x = " +
      format(x0, { notation: "fixed", precision: 15 });
    return results;
  } else if (!(err <= tol)) {
    results.conclusion =
      "An approximation of the root was found for x = " +
      format(x0, { notation: "fixed", precision: 15 });
    return results;
  } else if (cont === maxCount) {
    results.conclusion =
      "Given the number of iterations and the tolerance, it was impossible to find a satisfying root";
    return results;
  } else {
    results.conclusion = "The method exploded";
    return results;
  }
};

export default multipleRootsFunction;
