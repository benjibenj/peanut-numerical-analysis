const regressiveSubstitution = (M) => {
    
		//double[] var = new double[n];
        let n = M.length;
        let auxT = Array(n);
        
		for (let i = n - 1; i >= 0; i--) {
			let sum = 0;
			for (let j = i + 1; j < n; j++) {
				sum += M[i][j] * auxT[j];
			}
			auxT[i] = (auxT[i] - sum) / M[i][i];
		}
		console.log(auxT);
		return auxT;
	
  };
  
  export default regressiveSubstitution;