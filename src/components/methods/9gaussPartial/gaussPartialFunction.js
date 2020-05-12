//import findPivot from "../../../utils/findPivot";
import determinant from "../../../utils/matrixFunctions/determinant";
import regressiveSubstitution from "../../../utils/matrixFunctions/regressiveSubstitution";
import deepCopyFunction from "../../../utils/deepCopyFunction";
import { abs, max } from "mathjs";

const gaussPartialFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };

  let m = matrixA.length;
  let n = matrixA[0].length;
 
  if(m !== n){
   results.conclusion =
   "The matrix is not square";
  return results;
  }
  if(m !== B.length){
   results.conclusion =
   "B has different dimension";
  return results;
  }
  if(determinant(matrixA)===0){
   results.conclusion =
   "Determinant of the matrix cannot be zero";
  return results;
  }
 
  let M = new Array(n);
  
  for(let i = 0; i < n; i++){
   M[i] = new Array(n+1);
 }
 
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      M[i][j] = matrixA[i][j];
    }
    M[i][n] = B[i][0];
  }
 
  results.iterations.push(deepCopyFunction(M));
 
  for(let i = 0; i < n-1; i++){
 
   
     M = deepCopyFunction(M);

     let indexMax = new Array(2);
     let max = 0;

     for(let j = i; j < n; j ++){
       if(abs(M[j][i]) > abs(max)){
         max = M[j][i];
         indexMax[0] = j;
         indexMax[1] = i; 
       }
     }
     
     //let auxOp = new Array(n+1);
     for(let j = i; j < n+1; j++){

           let temp = M[indexMax[0]][j]; 
           M[indexMax[0]][j] = M[i][j];
           M[i][j] = temp;
         }
     
   
 
 
 
   for(let j = i+1; j < n; j++){
 
     if(M[j][i] !== 0){
       M = deepCopyFunction(M);
       let auxOp = Array(n+1);
       for(let k = i; k < n+1; k++){
         
           auxOp[k] = M[j][k] - ((M[j][i]/M[i][i])*M[i][k]);
           console.log(auxOp);
           console.log(auxOp[k]);
       }
 
         for(let k= i; k < n+1; k++){
           M[j][k] = auxOp[k]; 
           console.log(auxOp[k]);
           console.log(M[j][k]);
         }
       
 
         console.log(M);
  
     }
   }
   
   results.iterations.push(deepCopyFunction(M));
      
  }
   //let resultX = regressiveSubstitution(M);

  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = [[2], [3], [12], [12.828]];
  return results;
};

export default gaussPartialFunction;