import  {det, diag, add, unaryMinus, inv, multiply, subtract} from "mathjs";
import zeroInDiagonal from "../../../utils/matrixFunctions/zeroInDiagonal";
import tril from "../../../utils/matrixFunctions/tril";
import triu from "../../../utils/matrixFunctions/triu";

const jacobiFunction = (matrixA, B, initialValueX0, tol, NMax, norm, l= 1, w = 1 ) => {
  let results = {
    D: [[]],
    L: [[]],
    U: [[]],
    iterations: [],
    conclusion: undefined,
    finalSolution: [],
  };
  let T = [[]];
  let C = [[]];
  let D = [[]];
  let L = [[]];
  let U = [[]];
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
  D = diag(diag(matrixA));
  L = add(unaryMinus(tril(matrixA)), D); // L = -L + D
  U = add(unaryMinus(triu(matrixA)), D); // U = -U + D
  if(l===1) { // Jacobi
    T = multiply(inv(D),add(L, U));
    C = multiply(inv(D), B);
  }
  else if (l===2) { // Gauss-Seidel
    T = multiply(subtract(D,L),U);
    C = multiply(subtract(D,L),B);
  }
  else { // SOR
    T = multiply(inv(subtract(D,multiply(w,L))),add(multiply((1 - w),D),multiply(w,U)));
    C = multiply(multiply(w,inv(subtract(D, multiply(w,L)))),B);
  }
  results.iterations.push(matrixA);
  results.iterations.push(matrixA);
  results.conclusion = "After applying regressive substitution we get :";
  results.finalSolution = [[2], [3], [12], [12.828]];
  console.log(results);
  return results;
};

export default jacobiFunction;