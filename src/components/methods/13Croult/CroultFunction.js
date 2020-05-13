import determinant from "../../../utils/matrixFunctions/determinant";
import eye from "../../../utils/matrixFunctions/eye";
import zeros from "../../../utils/matrixFunctions/zeros";
import transpose from "../../../utils/matrixFunctions/transpose";
import progressiveSustitution from "../../../utils/matrixFunctions/progressiveSustitution";
import { usolve, sqrt} from "mathjs";
import deepCopyFunction from "../../../utils/deepCopyFunction";

const croultFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };

  let n = matrixA.length;
  

  
  let L = deepCopyFunction(eye(n));
  
  let U = deepCopyFunction(eye(n));
 

  for(let i = 0; i < n; i++){

    for(let j=i; j < n; j++){
      let productS = 0;
      
      
      for(let k = 0; k < i; k++){
        productS += L[j][k]*U[k][i];
      }
      L[j][i] = matrixA[j][i]-productS;
    }

    for (let j = i+1; j < n; j++){
      
      let productS = 0;
      for(let k = 0; k < i; k++){
        productS += L[i][k]*U[k][j];
      }
      
      U[i][j] = (matrixA[i][j]+(-productS))/L[i][i];
      
    } 
    
    results.iterations.push({
      L: deepCopyFunction(L),
      U: deepCopyFunction(U),
    });
  }

 
  results.conclusion = "After applying regressive and progressive substitution we get :";
    let resultZ = progressiveSustitution(L,B);
    let resultX = usolve(U, resultZ);

  results.finalSolution = resultX;
  return results;
};

export default croultFunction;