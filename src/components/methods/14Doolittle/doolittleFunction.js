import progressiveSustitution from "../../../utils/matrixFunctions/progressiveSustitution";
import deepCopyFunction from "../../../utils/deepCopyFunction";
import { usolve, divide, multiply, add } from "mathjs";
import eye from "../../../utils/matrixFunctions/eye";

const doolittleFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: []
  };

  let n = matrixA.length;
  let L = deepCopyFunction(eye(n));
  let U = deepCopyFunction(eye(n));

  for (let i = 0; i < n - 1; i++) {
    for (let j = i; j < n; j++) {
      let productS = 0;
      for (let k = 0; k < i; k++) {
        productS = add(productS, multiply(L[i][k], U[k][j]));
      }
      U[i][j] = add(matrixA[i][j], -productS);
    }
    for (let j = i + 1; j < n; j++) {
      let productS = 0;
      for (let k = 0; k < i; k++) {
        productS = add(productS, multiply(L[j][k], U[k][i]));
      }
      L[j][i] = divide(add(matrixA[j][i], -productS), U[i][i]);
    }
    results.iterations.push({
      L: deepCopyFunction(L),
      U: deepCopyFunction(U)
    });
  }
  let productS = 0;
  for (let k = 0; k < n - 1; k++) {
    productS = add(productS, multiply(L[n - 1][k], U[k][n - 1]));
  }
  U[n - 1][n - 1] = add(matrixA[n - 1][n - 1], -productS);
  results.iterations.push({
    L: deepCopyFunction(L),
    U: deepCopyFunction(U)
  });

  results.conclusion =
    "After applying regressive and progressive substitution we get :";
  let resultZ = progressiveSustitution(L, B);
  let resultX = usolve(U, resultZ);

  results.finalSolution = resultX;
  return results;
};

export default doolittleFunction;
