import { format, evaluate, abs } from "mathjs";
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
  let xR = b - (evaluate(functionText, {x: b}) * (b-a))/(evaluate(functionText, {x: b})- evaluate(functionText, {x: a}));

  let fxR = evaluate(functionText, { x: xR }); // we evaluate f(a)
  let error = tol +1;
  let temp = 0;

  results.iterations.push([
    count,
    format(a, { notation: "fixed", precision: 10 }),
    format(xR, { notation: "fixed", precision: 10 }),
    format(b, { notation: "fixed", precision: 10 }),
    format(fxR, { notation: "exponential", precision: 2 }),
    "",
  ]);
  
  do{

    if(fxR<0){
      a = xR
    }
    if(fxR > 0){
      b = xR
    }

     count += 1;
     temp = xR;
      xR = b - (evaluate(functionText, {x: b}) * (b-a))/(evaluate(functionText, {x: b})- evaluate(functionText, {x: a}));
      fxR = evaluate(functionText, { x: xR }); // we evaluate f(a)
      error = abs(xR - temp);
    results.iterations.push([
      count,
      format(a, { notation: "fixed", precision: 10 }),
      format(xR, { notation: "fixed", precision: 10 }),
      format(b, { notation: "fixed", precision: 10 }),
      format(fxR, { notation: "exponential", precision: 2 }),
      format(error, { notation: "exponential", precision: 2 }),
    ]);
  }while (error > tol && count < maxCount);

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
    results.conclusion =
      "There was an unknown issue";
    return results;
  }
};

export default falsePositionFunction;
