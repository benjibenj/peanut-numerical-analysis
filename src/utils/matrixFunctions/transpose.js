const transpose = (A) => {
    let matrixT = new Array(A.length);

  //console.log(A.length);
  //console.log(A);

  for (let i=0; i < A.length; i++) {
    matrixT[i] = new Array(A.length);
  }

    for (let i=0; i < A.length; i++) {
        for (let j=0; j < A[0].length; j++) {
          //  console.log(matrixT);
          matrixT[j][i] = A[i][j];
        }
      }
      return matrixT;
  };
  
  export default transpose;