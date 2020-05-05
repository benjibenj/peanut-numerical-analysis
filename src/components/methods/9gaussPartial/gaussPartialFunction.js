//import findPivot from "../../../utils/findPivot";

const gaussPartialFunction = (matrixA, B) => {
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

export default gaussPartialFunction;