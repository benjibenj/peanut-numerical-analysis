import gaussSimpleFunction from "../8gaussSimple/gaussSimpleFunction";
import hasDuplicates from "../../../utils/hasDuplicates";
import { format } from "mathjs";

const vandermondeFunction = points => {
  let results = {
    matrixA: [[]],
    B: [[]],
    ai: [[]],
    polynom: undefined,
    coeffs: []
  };
  if(hasDuplicates(points.x)){
    throw Error("X has duplicates, a value of X can only be declared once: x points = " +  points.x)
  }
  if (hasDuplicates(points.y)) {
    throw Error("Y has duplicates, a value of Y can only be declared once: y points = " + points.y);
  }
  let degree = points.x.length; // number of points
  let matrixA = Array(degree);
  let B = Array(degree);
  let ai = Array(degree);
  for (let i = 0; i < degree; i++) {
    matrixA[i] = new Array(degree).fill(0);
    B[i] = [points.y[i]]; // B is a column matrix with yi values
    ai[i] = ["a_" + (i + 1)]; // Just for displaying the equation we're solving
    for (let j = 0; j < degree; j++) {
      matrixA[i][j] = points.x[i] ** (degree - j - 1); // We create the Vandermonde matrix
    }
  }
  results.matrixA = matrixA;
  results.B = B;
  results.ai = ai;
  // Apply method to get x (gauss simple for example)
  results.polynom = gaussSimpleFunction(matrixA, B).finalSolution.map(coeff =>
    format(coeff[0], { notation: "fixed", precision: 6 })
  );
  return results;
};

export default vandermondeFunction;
