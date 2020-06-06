import gaussPartialFunction from "../9gaussPartial/gaussPartialFunction";
import zeros from "../../../utils/matrixFunctions/zeros";
import hasDuplicates from "../../../utils/hasDuplicates";
import { pow } from "mathjs";

const splinesCuadFunction = points => {
  let results = {
    polynom: undefined,
    interpolationPolynomials: [],
    tracerCoefficient: [],
  };
  if(hasDuplicates(points.x)){
    throw Error("X has duplicates, a value of X can only be declared once: x points = " +  points.x)
  }
  if (hasDuplicates(points.y)) {
    throw Error("Y has duplicates, a value of Y can only be declared once: y points = " + points.y);
  }

  let n = points.x.length;
  let m = 3 * (n - 1);
  let A = zeros(m);

  if(n!== points.y.length){
    throw Error("x y y has different dimensions")
  }
  let S = new Array(n - 1);
  for (let i = 0; i < n - 1; i++) {
    S[i] = new Array(3);
    S[i][0] = 0;
    S[i][1] = 0;
    S[i][2] = 0;
  }

  let b = new Array(m);
  for (let i = 0; i < m; i++) {
    b[i] = new Array(1);
    b[i][0] = 0;
  }

  if (n !== points.y.length) {
    return;
  }

  // interpolation conditions

  for (let i = 0; i < n - 1; i++) {
    A[i + 1][3 * (i + 1) - 3] = pow(parseFloat(points.x[i + 1]), 2);
    A[i + 1][3 * (i + 1) - 2] = parseFloat(points.x[i + 1]);
    A[i + 1][3 * (i + 1) - 1] = 1;

    b[i + 1][0] = parseFloat(points.y[i + 1]);
  }

  A[0][0] = pow(parseFloat(points.x[0]), 2);
  A[0][1] = parseFloat(points.x[0]);
  A[0][2] = 1;

  b[0][0] = parseFloat(points.y[0]);

  // continuity conditions
  for (let i = 1; i < n - 1; i++) {
    A[n - 1 + i][3 * i - 3] = pow(parseFloat(points.x[i]), 2);
    A[n - 1 + i][3 * i - 2] = parseFloat(points.x[i]);
    A[n - 1 + i][3 * i - 1] = 1;
    A[n - 1 + i][3 * i] = -pow(parseFloat(points.x[i]), 2);
    A[n - 1 + i][3 * i + 1] = -parseFloat(points.x[i]);
    A[n - 1 + i][3 * i + 2] = -1;

    b[n - 1 + i][0] = 0;
  }

  //softness condition

  for (let i = 1; i < n - 1; i++) {
    A[2 * n - 3 + i][3 * i - 3] = 2 * parseFloat(points.x[i]);
    A[2 * n - 3 + i][3 * i - 2] = 1;
    A[2 * n - 3 + i][3 * i - 1] = 0;
    A[2 * n - 3 + i][3 * i] = -2 * parseFloat(points.x[i]);
    A[2 * n - 3 + i][3 * i + 1] = -1;
    A[2 * n - 3 + i][3 * i + 2] = 0;

    b[2 * n - 3 + i][0] = 0;
  }

  //ultimate condition

  A[m - 1][0] = 2;
  b[m - 1][0] = 0;

  let solX = gaussPartialFunction(A, b).finalSolution;

  for (let i = 0; i < solX.length/3; i++) {
    results.interpolationPolynomials.push(
      solX[i*3] + "x^2 + (" + solX[i*3 +1] + ")x + (" + solX[i*3 + 2] + ")",
    );
    results.tracerCoefficient.push([solX[i*3], solX[i*3 + 1], solX[i*3 + 2]]);
  }

  return results;
};

export default splinesCuadFunction;
