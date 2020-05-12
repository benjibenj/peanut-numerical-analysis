const eye = (a) => {
    let result = new Array(a);
    for (let i = 0; i < a; i++) {
      result[i] = new Array(a);
      for(let j = 0; j < a; j++){
          if(j !== i){
         result[i][j] = 0;
          } 
          else{
              result[i][j] = 1;
          }
      }
    }
    return result;
  };
  
  export default eye;