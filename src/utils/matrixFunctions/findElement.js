const findElement = (M, e) => {
    let results = new Array(2);
    for (let i = 0; i < M.length; i++) {
      for (let j = 0; j < M[0].length; j++) {
        if ((M[i][j] === e)) {
            results[0] = i;
            results[1] = j;
          return results;
        }
      }
    }
    return false;
  };
  
  export default findElement;