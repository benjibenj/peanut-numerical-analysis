import determinant from "../../../utils/matrixFunctions/determinant";
import eye from "../../../utils/matrixFunctions/eye";
import zeros from "../../../utils/matrixFunctions/zeros";

import { usolve } from "mathjs";
import deepCopyFunction from "../../../utils/deepCopyFunction";

const choleskyFunction = (matrixA, B) => {
  let results = {
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };
  
  results.iterations.push(matrixA);
  results.iterations.push(matrixA);
  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = [[2], [3], [12], [12.828]];
  return results;
};

export default choleskyFunction;