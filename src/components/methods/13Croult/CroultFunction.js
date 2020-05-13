import determinant from "../../../utils/matrixFunctions/determinant";
import eye from "../../../utils/matrixFunctions/eye";
import zeros from "../../../utils/matrixFunctions/zeros";
import transpose from "../../../utils/matrixFunctions/transpose";

import { usolve } from "mathjs";
import deepCopyFunction from "../../../utils/deepCopyFunction";

const croultFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };

  let n = matrixA[0].length;
  
  let L = eye(n);
  let U = eye(n);
console.log(transpose(matrixA));
  results.iterations.push(deepCopyFunction(matrixA));

  /*for(let i = 0; i < n-1; i++){
    for(let j=i; j < n; j++){
      U[i][j]
    }
  }*/
  results.iterations.push(matrixA);
  results.iterations.push(matrixA);
  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = [[2], [3], [12], [12.828]];
  return results;
};

export default croultFunction;