import determinant from "../../../utils/matrixFunctions/determinant";
import findMaxElement from "../../../utils/matrixFunctions/findMaxElement";
import triu from "../../../utils/matrixFunctions/triu";

import eye from "../../../utils/matrixFunctions/eye";
import zeros from "../../../utils/matrixFunctions/zeros";

import { usolve } from "mathjs";
import deepCopyFunction from "../../../utils/deepCopyFunction";
import getCol from "../../../utils/matrixFunctions/getCol";

const luSimpleFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };
  let n = matrixA[0].length;
  let m = matrixA.length;
  
  let L = eye(n);
  let U = zeros(n);
  
  let M = deepCopyFunction(matrixA);
  
 results.iterations.push(deepCopyFunction(M));

for (let i = 0; i < n-1; i++) {
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

  // Multipliers
  for (let j = i + 1; j < n; j++) {
    if (M[j][i] !== 0) {
      M = deepCopyFunction(M);
      L = deepCopyFunction(L);
      U = deepCopyFunction(U);

      L[j][i] = M[j][i]/M[i][i];

      let auxOp = Array(n + 1);
      for (let k = i; k < n; k++) {
        auxOp[k] = M[j][k] - (M[j][i] / M[i][i]) * M[i][k];
      }

      for (let k = i; k < n ; k++) {
        M[j][k] = auxOp[k];
      }
    }
  }
  
//U
U = deepCopyFunction(U);
M = deepCopyFunction(M);
for(let j = i; j < n; j++){
  U[i][j] = M[i][j];
}
for(let j = i+1; j < n; j++){
  U[i+1][j] = M[i+1][j];
}
console.log(L);
console.log(U);
  results.iterations.push(deepCopyFunction(L));
  results.iterations.push(deepCopyFunction(U));
}

U[n-1][n-1] = M[n-1][n-1];
  results.conclusion = "After applying regressive substitution we get :";

  return results;
};

export default luSimpleFunction;