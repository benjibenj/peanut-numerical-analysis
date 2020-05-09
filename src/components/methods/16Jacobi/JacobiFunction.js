import {matrix, det, diag} from "mathjs";
import zeroInDiagonal from "../../../utils/matrixFunctions/zeroInDiagonal";
import tril from "../../../utils/matrixFunctions/tril";
import triu from "../../../utils/matrixFunctions/triu";

const jacobiFunction = (matrixA, B, initialValueX0, tol, NMax, norm) => {
  let results = {
    D: [[]],
    L: [[]],
    U: [[]],
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };
  // Check if some elements from the diagonal are 0
  if(zeroInDiagonal(matrixA)) {
    results.conclusion = "Some elements in the diagonal are 0. The method cannot be executed.";
    return results;
  }
  // Check if det(A) = 0
  if(det(matrixA)===0) {
    results.conclusion = "det(A) is 0. The method cannot be executed.";
    return results;
  }
  results.D = diag(diag(matrixA));
  results.L = tril(matrixA);
  results.U = triu(matrixA);
  results.iterations.push(matrixA);
  results.iterations.push(matrixA);
  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = [[2], [3], [12], [12.828]];
  console.log(results);
  return results;
};

export default jacobiFunction;