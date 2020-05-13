

import transpose from "./transpose";

const progressiveSustitution = (A,B) => {
    
    let n = A[0].length;
    
    let xResult= new Array(n);
    
    xResult[0] = B[0]/A[0][0];

    for (let i = 1; i < n; i++) {
      let suma = 0;
        for(let j = 0; j < i; j++){
            suma += A[i][j]*xResult[j];
            console.log(A[i][j]);
            console.log(xResult[j]);
       } 
       xResult[i] = (B[i] -suma)/A[i][i];
    }
    xResult = transpose(xResult);
    return xResult;
  };
  
  export default progressiveSustitution;