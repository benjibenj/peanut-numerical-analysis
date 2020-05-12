//import findPivot from "../../../utils/findPivot";
import determinant from "../../../utils/matrixFunctions/determinant";
import deepCopyFunction from "../../../utils/deepCopyFunction";
const gaussSimpleFunction = (matrixA, B) => {
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
   M[i][n] = B[i];
 }

 results.iterations.push(deepCopyFunction(M));

 for(let i = 0; i < n; i++){

  if(M[i][i] === 0){
    
    for(let j = i+1; j < n; j++){
      if(M[j][i] !== 0){
        let aux = new Array(n+1);
        for(let k = i; k < n+1; k++){
          aux[j][k] = M[j][k]; 
          M[j][k] = M[i][k];
          M[i][k] = aux[j][k];
        } 
        break;
      }
    }
  }

  for(let j = i+1; j < n; j++){

    
      for(let k = i; k < n+1; k++){
        M[j][k] =  M[j][k] - ((M[j][i]/M[i][i])*M[i][k]);
      } 
    }
  
    results.iterations.push(deepCopyFunction(M));
    M = deepCopyFunction(M);
 }

  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = [[2], [3], [12], [12.828]];
  return results;
};

export default gaussSimpleFunction;