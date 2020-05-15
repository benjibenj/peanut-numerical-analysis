import eye from "../../../utils/matrixFunctions/eye";
import progressiveSustitution from "../../../utils/matrixFunctions/progressiveSustitution";
import { usolve, sqrt, divide, multiply, add} from "mathjs";
import deepCopyFunction from "../../../utils/deepCopyFunction";

const choleskyFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };
  
  let n = matrixA.length;
  

  
  let L = deepCopyFunction(eye(n));
  
  let U = deepCopyFunction(eye(n));
 

  for(let i = 0; i < n-1; i++){

    let productS1 = 0;
      for(let k = 0; k < i; k++){
        productS1 += L[i][k]*U[k][i];
      }
    L[i][i]=sqrt(matrixA[i][i]+(-productS1));
    
    U[i][i]=L[i][i];

    for(let j = i+1; j < n; j++){
      let productS = 0;
      
      
      for(let k = 0; k < i; k++){
        productS = add(productS, L[j][k]*U[k][i]);
      }
      L[j][i] = divide(matrixA[j][i]+(-productS),U[i][i]);
      
    }

    for (let j = i+1; j < n; j++){
      
      let productS = 0;
      for(let k = 0; k < i; k++){
        productS += add(productS, multiply(L[i][k],U[k][j]));
      }
      U[i][j] = divide(matrixA[i][j]+(-productS),L[i][i]);
      
    } 
    results.iterations.push({
      L: deepCopyFunction(L),
      U: deepCopyFunction(U),
    });
    }

  let productS = 0;
  for(let k = 0; k < n-1; k++){
    productS =add(productS, multiply(L[n-1][k],U[k][n-1]));
  }
  L[n-1][n-1] = sqrt(matrixA[n-1][n-1]-productS);
 
  U[n-1][n-1]=L[n-1][n-1];

  results.iterations.push({
    L: deepCopyFunction(L),
    U: deepCopyFunction(U),
  });
  results.conclusion = "After applying regressive and progressive substitution we get :";
    let resultZ = progressiveSustitution(L,B);
    let resultX = usolve(U, resultZ);

  results.finalSolution = L;
  return results;
};

export default choleskyFunction;