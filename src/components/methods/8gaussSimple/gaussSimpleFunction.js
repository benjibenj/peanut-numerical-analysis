import deepCopyFunction from "../../../utils/deepCopyFunction";
import { usolve, det } from "mathjs";
import getCol from "../../../utils/matrixFunctions/getCol";

const gaussSimpleFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: []
  };
  let m = matrixA.length;
  let n = matrixA[0].length;
  
  if (m !== n) {
    throw Error("The matrix is not square");
  }
  if (m !== B.length) {
    throw Error("B has different dimension");
  }
  if (det(matrixA) === 0) {
    throw Error("Determinant of the matrix cannot be zero");
  }

  let M = new Array(n);
  for (let i = 0; i < n; i++) {
    M[i] = new Array(n + 1);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      M[i][j] = matrixA[i][j];
    }
    M[i][n] = B[i][0];
  }
  results.iterations.push(deepCopyFunction(M));
  for (let i = 0; i < n - 1; i++) {
    if (M[i][i] === 0) {
      M = deepCopyFunction(M);
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
    for (let j = i + 1; j < n; j++) {
      if (M[j][i] !== 0) {
        M = deepCopyFunction(M);
        let auxOp = Array(n + 1);
        for (let k = i; k < n + 1; k++) {
          auxOp[k] = M[j][k] - (M[j][i] / M[i][i]) * M[i][k];
        }

        for (let k = i; k < n + 1; k++) {
          M[j][k] = auxOp[k];
        }
      }
    }
    results.iterations.push(deepCopyFunction(M));
  }
  let resultX = usolve(
    M.map(function(val) {
      // A = all columns of M except the last one
      return val.slice(0, -1);
    }),
    getCol(M, n) // B = last column of M
  );
  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = resultX;
  return results;
};

export default gaussSimpleFunction;
