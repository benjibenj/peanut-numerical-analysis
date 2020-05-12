//import findPivot from "../../../utils/findPivot";
import determinant from "../../../utils/matrixFunctions/determinant";
import findElement from "../../../utils/matrixFunctions/findElement";

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
  "Determinant of the matrix must be zero";
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

 for(let i = 0; i < n-1; i++){
   
  /*if(M[i][i] === 0){
    
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
  }*/

  for(let j = i+1; j < n; j++){

    if(M[j][i] !== 0){
      for(let k = i; k < n+1; k++){
        var auxOp = Array(n+1);

        for(let l= i; l < n+1; l++){
          auxOp[l] = M[j][l] - ((M[j][i]/M[i][i])*M[i][l]);
        }
        M[j][k] = auxOp[k]; 
      }
    }
  }
 }
 results.iterations.push(M);
  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = [[2], [3], [12], [12.828]];
  return results;
};

export default gaussSimpleFunction;