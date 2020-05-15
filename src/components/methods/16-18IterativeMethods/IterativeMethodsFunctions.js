import {det, diag, add, unaryMinus, inv, multiply, subtract, abs, max, norm} from "mathjs";
import {eig} from "numericjs"; //didn't exist for non-symmetrical matrices in mathjs
import zeroInDiagonal from "../../../utils/matrixFunctions/zeroInDiagonal";
import tril from "../../../utils/matrixFunctions/tril";
import triu from "../../../utils/matrixFunctions/triu";

const iterativeMethodsFunctions = (
  matrixA,
  B,
  initialValueX0,
  tol,
  NMax,
  normValue,
  l = 1,
  w = 1,
) => {
  let results = {
    D: [[]],
    L: [[]],
    U: [[]],
    C: [[]],
    T: [[]],
    spectralRadiance: undefined,
    iterations: [],
    conclusion: undefined,
    error: null,
    finalSolution: [],
  };
  let T = [[]];
  let C = [[]];
  let D = [[]];
  let L = [[]];
  let U = [[]];
  let error = tol + 1;
  let count = 0;
  let xAnt;
  let x;
  // Check if some elements from the diagonal are 0
  if (zeroInDiagonal(matrixA)) {
    results.error =
      "Some elements in the diagonal are 0. The method cannot be executed.";
    return results;
  }
  // Check if det(A) = 0
  if (det(matrixA) === 0) {
    results.error = "det(A) is 0. The method cannot be executed.";
    return results;
  }
  D = diag(diag(matrixA));
  L = add(unaryMinus(tril(matrixA)), D); // L = -lowerTriangle + D
  U = add(unaryMinus(triu(matrixA)), D); // U = -upperTriangle + D
  if (l === 1) {
    // Jacobi
    T = multiply(inv(D), add(L, U));
    C = multiply(inv(D), B);
  } else if (l === 2) {
    // Gauss-Seidel
    T = multiply(inv(subtract(D, L)), U);
    C = multiply(inv(subtract(D, L)), B);
  } else {
    // SOR
    T = multiply(
      inv(subtract(D, multiply(w, L))),
      add(multiply(1 - w, D), multiply(w, U)),
    );
    C = multiply(multiply(w, inv(subtract(D, multiply(w, L)))), B);
  }
  results.D = D;
  results.L = L;
  results.U = U;
  results.C = C;
  results.T = T;
  results.spectralRadiance = abs(max(eig(T).lambda.x));
  if(results.spectralRadiance > 1) {
    results.error = "Error : the spectral radiance is superior to 1, the method cannot be executed";
    return results;
  }
  xAnt = initialValueX0;
  results.iterations.push([
    count,
    undefined,
    xAnt
  ]);
  while(error > tol && count < NMax) {
    x = add(multiply(T,xAnt), C);
    error = norm(subtract(xAnt, x), normValue);
    // norm only accepts 1 or "inf" => we have to create a function
    // to get the p-norm of a vector
    xAnt = x;
    count += 1;
    results.iterations.push([
      count,
      error,
      x
    ]);
  }
  // handle the case where it couldn't find with this NMAX
  return results;
};

export default iterativeMethodsFunctions;
