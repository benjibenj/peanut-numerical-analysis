import React from "react";
import BigContainer from "../containers/BigContainer";

const MatrixInput = ({
  matrixNbColumns = 3,
  matrixNbRows = 3,
  matrix = [],
  setMatrix,
  setMatrixInputVisible,
}) => {
  matrix = Array(matrixNbRows);
  for(let i = 0; i < matrixNbColumns; i++){
    matrix.push(Array(matrixNbColumns))
  }
  return <BigContainer />;
};

export default MatrixInput;
