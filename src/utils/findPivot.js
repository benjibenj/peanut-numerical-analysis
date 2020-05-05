const findPivot = (M, k) => {
  var i_max = k;
  for(var i=k+1; i<M.length; ++i) {
    if (Math.abs(M[i][k]) > Math.abs(M[i_max][k])) {
      i_max = i;
    }
  }
  return i_max;
};

export default findPivot;