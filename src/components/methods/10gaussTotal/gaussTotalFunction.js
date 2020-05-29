import progressiveSustitution from "../../../utils/matrixFunctions/progressiveSustitution";
import findMaxElement from "../../../utils/matrixFunctions/findMaxElement";
import determinant from "../../../utils/matrixFunctions/determinant";
import deepCopyFunction from "../../../utils/deepCopyFunction";
import getCol from "../../../utils/matrixFunctions/getCol";
import { usolve } from "mathjs";

const gaussTotalFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };

  let m = matrixA.length;
  let n = matrixA[0].length;
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

  let marca = new Array(n);
  for (let i = 0; i < n; i++) {
    marca[i] = i+1;
  }

  results.iterations.push(deepCopyFunction(M));
  for (let i = 0; i < n - 1; i++) {
    // cambio de columna
    let indexMax = new Array(2);

    
    
    indexMax = findMaxElement(M, i, i);
    let colMayor = indexMax[1];

    for (let j = 0; j < n; j++) {
      let temp = M[j][indexMax[1]];
      M[j][indexMax[1]] = M[j][i];
      M[j][i] = temp;
    }
    //Cambio de fila
    for (let j = i; j < n + 1; j++) {
      let temp = M[indexMax[0]][j];
      M[indexMax[0]][j] = M[i][j];
      M[i][j] = temp;
    }
    for (let j = i + 1; j < n; j++) {
      if (M[j][i] !== 0) {
        let auxOp = Array(n + 1);
        for (let k = i; k < n + 1; k++) {
          auxOp[k] = M[j][k] - (M[j][i] / M[i][i]) * M[i][k];
        }
        for (let k = i; k < n + 1; k++) {
          M[j][k] = auxOp[k];
        }
      }
    }

    if(colMayor !== i){
      let temp = marca[colMayor];
      marca[colMayor] = marca[i];
      marca[i] = temp;
    }
    results.iterations.push(deepCopyFunction(M));
  }

  results.conclusion = "After applying regressive substitution we get :";
  let resultX = usolve(
    M.map(function(val) { // A = all columns of M except the last one
      return val.slice(0, -1);
    }),
    getCol(M, m), // B = last column of M
  );

  let tempAr = deepCopyFunction(resultX);
  for(let i = 0; i <n; i++){
    resultX[i] = tempAr[marca[i]-1];
  }
  
  results.finalSolution = resultX;

  return results;
};

export default gaussTotalFunction;
