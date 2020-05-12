import gaussSimpleFunction from "../8gaussSimple/gaussSimpleFunction";

const vandermondeFunction = (
  points
) => {
  let results = {
    matrixA: [[]],
    B: [[]],
    ai: [[]],
    polynom: undefined
  };
  let degree = points.x.length; // number of points
  let matrixA = Array(degree);
  let B = Array(degree);
  let ai = Array(degree);
  for (let i = 0; i < degree; i++) {
    matrixA[i] = new Array(degree).fill(0);
    B[i] = [points.y[i]]; // B is a column matrix with yi values
    ai[i] = ["a_"+(i+1)]; // Just for displaying the equation we're solving
    for (let j = 0; j < degree; j++) {
      matrixA[i][j] = points.x[i]**(degree-j-1) // We create the Vandermonde matrix
    }
  }
  results.matrixA = matrixA;
  results.B = B;
  results.ai = ai;
  // Apply method to get x (gauss simple for example)
  results.polynom = gaussSimpleFunction(matrixA, B).finalSolution;
  return results;
};

export default vandermondeFunction;
