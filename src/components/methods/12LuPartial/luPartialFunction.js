import progressiveSustitution from "../../../utils/matrixFunctions/progressiveSustitution";
import determinant from "../../../utils/matrixFunctions/determinant";
import deepCopyFunction from "../../../utils/deepCopyFunction";
import zeros from "../../../utils/matrixFunctions/zeros";
import eye from "../../../utils/matrixFunctions/eye";   
import { usolve, abs } from "mathjs";

const luPartialFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: []
  };

  let n = matrixA[0].length;
  let m = matrixA.length;
  let L = eye(n);
  let U = zeros(n);
  let P = eye(n);
  let M = deepCopyFunction(matrixA);

  if (m !== n) {
    throw Error("The matrix is not square");
  }
  if (m !== B.length) {
    throw Error("B has different dimension");
  }
  if (determinant(matrixA) === 0) {
    throw Error("Determinant of the matrix cannot be zero");
  }
  for (let i = 0; i < n - 1; i++) {
    //row change
     //max col
    let indexMax = new Array(2);
    let tempM = 0;
    for (let j = i + 1; j < n; j++) {
      if(abs(M[j][i]) > abs(tempM)){
        tempM = abs(M[j][i]);
        indexMax[0]=j;
        indexMax[1]=i;
      }
    }

    if(tempM > abs(M[i][i])){
      
      for(let j = i; j < n; j++){
        let aux1 = M[indexMax[0]][j];
        M[indexMax[0]][j] = M[i][j];
        M[i][j] = aux1;

        let aux2 = P[indexMax[0]][j];
        P[indexMax[0]][j] = P[i][j];
        P[i][j] = aux2;
      }

      if(i>1){

        for(let j = 0; j < i-1; j++){
          let aux1 = L[indexMax[0]][j];
          L[indexMax[0]][j] = L[i][j];
          L[i][j] = aux1;
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
    
    for (let j = i; j < n; j++) {
      U[i][j] = M[i][j];
    }
    for (let j = i + 1; j < n; j++) {
      U[i + 1][j] = M[i + 1][j];
    }
    results.iterations.push({
      M: deepCopyFunction(M),
      L: deepCopyFunction(L),
      U: deepCopyFunction(U),
      P: deepCopyFunction(P)
    });
  }

  let resultZ = progressiveSustitution(L, B);
  let resultX = usolve(U, resultZ);
  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = resultX;
  return results;
};

export default luPartialFunction;
