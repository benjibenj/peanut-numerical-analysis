import React from "react";
import { Parameters } from "../containers/BigContainer";
import styled from "styled-components";
import { randomInt } from "mathjs";
import {Spacing} from "../rules";

const MatrixInput = ({
  matrixSize,
  setMatrix,
  setMethodState,
  type = "A"
}) => {
  let matrix = Array(matrixSize.rows);
  for (let i = 0; i < matrixSize.rows; i++) {
    matrix[i] = new Array(matrixSize.columns).fill(0);
  }
  const handleSubmit = event => {
    event.preventDefault();
    let count = 0;
    for (let i = 0; i < matrixSize.rows; i++) {
      for (let j = 0; j < matrixSize.columns; j++) {
        // If the floating point number cannot be parsed, we set 0 for this value
        matrix[i][j] = !isNaN(parseFloat(event.target[count].value)) ? parseFloat(event.target[count].value) : 0;
        count += 1;
      }
    }
    setMatrix(matrix);
    if (type === "A") {
      setMethodState(prevState => ({
        ...prevState,
        matrixA: "matrix"
      }));
    } else if (type === "B") {
      setMethodState(prevState => ({
        ...prevState,
        B: "matrix"
      }));
    }

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
                    type="text"
                    defaultValue={randomInt(1, 10)}
                    name={indexRow + "," + indexColumn}
                  />
                );
              })}
            </MatrixRow>
          );
        })}
        <button>{type === "A" ? "Save A" : type === "B" ? "Save B" : "Save"}</button>
      </form>
    </MatrixParameters>
  );
};

const MatrixRow = styled("div")`
  display: flex;
  flex-direction: row;
  margin: ${Spacing.lg};
`;

const MatrixParameters = styled(Parameters)`
  input {
    padding: 13px 0;
    text-align: center;
    margin: 0px 5px;
    height: 12px;
    width: 50px;
  }
  form {
    text-align: center;
  }
`;

export default MatrixInput;
