import progressiveSustitution from "../../../utils/matrixFunctions/progressiveSustitution";
import deepCopyFunction from "../../../utils/deepCopyFunction";
import zeros from "../../../utils/matrixFunctions/zeros";
import eye from "../../../utils/matrixFunctions/eye";
import { usolve, det, add, multiply, divide } from "mathjs";

const luSimpleFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: []
  };
  let n = matrixA[0].length;
  let m = matrixA.length;

  let L = eye(n);
  let U = zeros(n);

  let M = deepCopyFunction(matrixA);

  let xZeros = new Array(n);

  if (det(matrixA) === 0) {
    throw Error("Determinant of the matrix cannot be zero");
  }
  
  for (let i = 0; i < n; i++) {
    xZeros[i] = new Array(1);
    xZeros[i][0] = 0;
  }

  for (let i = 0; i < n - 1; i++) {
    if (M[i][i] === 0) {
      throw Error("There is a 0 in the diagonal.");
    }
    // Multipliers
    for (let j = i + 1; j < n; j++) {
      if (M[j][i] !== 0) {

        L[j][i] = divide(M[j][i], M[i][i]);

        let auxOp = Array(n + 1);
        for (let k = i; k < n; k++) {
          auxOp[k] = add(M[j][k] ,- multiply(divide(M[j][i], M[i][i]), M[i][k]));
        }

        for (let k = i; k < n; k++) {
          M[j][k] = auxOp[k];
        }
      }
    }
    //U
    for (let j = i; j < n; j++) {
      U[i][j] = M[i][j];
    }
    for (let j = i + 1; j < n; j++) {
      U[i + 1][j] = M[i + 1][j];
    }
    results.iterations.push({
      M: deepCopyFunction(M),
      L: deepCopyFunction(L),
      U: deepCopyFunction(U)
    });
  }

  U[n - 1][n - 1] = M[n - 1][n - 1];

  let resultZ = progressiveSustitution(L, B);
  let resultX = usolve(U, resultZ);
  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = resultX;
  return results;
};

export default luSimpleFunction;
