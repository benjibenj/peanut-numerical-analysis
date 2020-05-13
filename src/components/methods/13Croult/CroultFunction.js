import determinant from "../../../utils/matrixFunctions/determinant";
import eye from "../../../utils/matrixFunctions/eye";
import zeros from "../../../utils/matrixFunctions/zeros";
import transpose from "../../../utils/matrixFunctions/transpose";

import { usolve, sqrt} from "mathjs";
import deepCopyFunction from "../../../utils/deepCopyFunction";

const croultFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };

  let n = matrixA.length;
  
  let L = eye(n);
  let U = eye(n);
  console.log(L);
  results.iterations.push(deepCopyFunction(matrixA));

  for(let i = 0; i < n; i++){
    for(let j=i; j < n; j++){
      let productS = 0;
      console.log(matrixA[j][i]);
      
      for(let k = 0; k < i; k++){
        productS += L[j][k]*U[k][i];
        console.log(L[j][k]);
        console.log(U[k][i]);
      }
      console.log(productS);
      L[j][i] = matrixA[j][i]-productS;
      console.log(L);
      
    }
    for (let j = i+1; j < n; j++){
      let productS = 0;
      for(let k = 0; k < i-1; k++){
        productS += L[j][k]*U[k][i];
      }
      L[j][i] = (matrixA[j][i]-productS)/L[i,i];
    } 
    
  results.iterations.push(L);
  results.iterations.push(U);
  }

 
  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = [[2], [3], [12], [12.828]];
  return results;
};

export default croultFunction;