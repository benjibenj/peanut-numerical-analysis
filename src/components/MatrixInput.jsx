import React from "react";
import BigContainer, { Parameters } from "../containers/BigContainer";
import styled from "styled-components";
import { randomInt } from "mathjs";
const MatrixInput = ({
  matrixNbColumns = 3,
  matrixNbRows = 3,
  matrix = [],
  setMatrix,
  setMatrixInputVisible,
}) => {
  matrix = Array(matrixNbRows);
  for (let i = 0; i < matrixNbRows; i++) {
    matrix[i] = new Array(matrixNbColumns).fill(0);
  }
  const handleSubmit = event => {
    event.preventDefault();
    for (let i = 0; i < matrixNbRows; i++) {
      for (let j = 0; j < matrixNbColumns; j++) {
        matrix[i][j] = event.target[i + j].value;
      }
    }
    setMatrix(matrix);
    setMatrixInputVisible(false);
  };
  return (
    <MatrixParameters>
      <form onSubmit={handleSubmit}>
        {matrix.map((row, indexRow = 1) => {
          return (
            <MatrixRow key={indexRow}>
              {row.map((item, indexColumn = 1) => {
                return (
                  <input
                    key={indexRow + " " + indexColumn}
                    type="number"
                    step="0.01"
                    defaultValue={randomInt(1, 10)}
                    name={indexRow + "," + indexColumn}
                  />
                );
              })}
            </MatrixRow>
          );
        })}
        <button>Save</button>
      </form>
    </MatrixParameters>
  );
};

const MatrixRow = styled("div")`
  display: flex;
  flex-direction: row;
`;

const MatrixParameters = styled(Parameters)`
  input {
    border: 1px solid black;
  }
`;

export default MatrixInput;
