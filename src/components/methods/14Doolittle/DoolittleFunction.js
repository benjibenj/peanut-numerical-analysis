//import findPivot from "../../../utils/findPivot";
import eye from "../../../utils/matrixFunctions/eye";
import progressiveSustitution from "../../../utils/matrixFunctions/progressiveSustitution";
import { usolve} from "mathjs";
import deepCopyFunction from "../../../utils/deepCopyFunction";

const doolittleFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };
  let n = matrixA.length;
  

  
  let L = deepCopyFunction(eye(n));
  
  let U = deepCopyFunction(eye(n));
 
console.log(deepCopyFunction(matrixA));
  for(let i = 0; i < n; i++){

    for (let j = i+1; j < n; j++){
      
      let productS = 0;
      for(let k = 0; k < i; k++){
        productS += L[i][k]*U[k][j];
      }
      
      U[i][j] = matrixA[i][j]-productS;   
      console.log(U[i][j]);
      console.log(deepCopyFunction(U));
    }

    for(let j=i; j < n; j++){
      let productS = 0;
      
      
      for(let k = 0; k < i; k++){
        productS += L[j][k]*U[k][i];
      }
      L[j][i] = (matrixA[j][i]+(-productS))/U[1][1];
      console.log(L[j][i]);
      console.log(deepCopyFunction(L));
    }

    console.log(deepCopyFunction(L));
    console.log(deepCopyFunction(U));
    
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

export default doolittleFunction;