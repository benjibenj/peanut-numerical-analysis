import determinant from "../../../utils/matrixFunctions/determinant";
import eye from "../../../utils/matrixFunctions/eye";
import zeros from "../../../utils/matrixFunctions/zeros";
import progressiveSustitution from "../../../utils/matrixFunctions/progressiveSustitution";
import { usolve } from "mathjs";
import deepCopyFunction from "../../../utils/deepCopyFunction";

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
  for (let i = 0; i < n; i++) {
    xZeros[i] = new Array(1);
    xZeros[i][0] = 0;
  }

  if (m !== n) {
    results.conclusion = "The matrix is not square";
    return results;
  }
  if (m !== B.length) {
    results.conclusion = "B has different dimension";
    return results;
  }
  if (determinant(matrixA) === 0) {
    results.conclusion = "Determinant of the matrix cannot be zero";
    return results;
  }
  for (let i = 0; i < n - 1; i++) {
    if (M[i][i] === 0) {
      
      for (let j = i + 1; j < n; j++) {
        if (M[j][i] !== 0) {
          let aux = new Array(n + 1);
          for (let k = i; k < n + 1; k++) {
            aux[k] = M[j][k];
            M[j][k] = M[i][k];
            M[i][k] = aux[k];
          }
          break;
        }
      }
    }

    // Multipliers
    for (let j = i + 1; j < n; j++) {
      if (M[j][i] !== 0) {

        L[j][i] = M[j][i] / M[i][i];

        let auxOp = Array(n + 1);
        for (let k = i; k < n; k++) {
          auxOp[k] = M[j][k] - (M[j][i] / M[i][i]) * M[i][k];
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
