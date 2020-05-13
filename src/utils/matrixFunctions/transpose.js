const transpose = (A, n) => {
    let matrixT = new Array(A.length);


  for (let i=0; i < A.length; i++) {
    matrixT[i] = new Array(n);
  }

  if(n > 0){
    for (let i=0; i < A.length; i++) {
      for (let j=0; j < n; j++) {
        matrixT[j][i] = A[i][j];
      }
    }
  }
  else{
        for (let i=0; i < A.length; i++) {
          matrixT[i][0] = A[i];
      }
    }
      return matrixT;
  };
  
  export default transpose;