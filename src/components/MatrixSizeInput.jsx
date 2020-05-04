import { Parameters, RowContainer } from "../containers/BigContainer";
import Method from "./methods/Method";
import React from "react";

const MatrixInputSize = (
  {
    setMatrixNbRows,
    setMatrixNbColumns,
    setMatrixInputVisible,
    setMatrixInputSizeVisible,
    matrixNbColumns,
    matrixNbRows,
  }
) => {
  return (
    <RowContainer>
      <Parameters>
        <label>
          Matrix number of rows
          <input
            type="number"
            name="matrixNbRows"
            min="2"
            max="8"
            defaultValue={3}
            onChange={e => {
              const size = parseInt(e.target.value);
              if (2 <= size && size <= 8) {
                setMatrixNbRows(size);
              }
            }}
          />
        </label>
        <label>
          Matrix number of columns
          <input
            type="number"
            name="matrixNbColumns"
            min="2"
            max="8"
            defaultValue={3}
            onChange={e => {
              const size = parseInt(e.target.value);
              if (2 <= size && size <= 8) {
                setMatrixNbColumns(size);
              }
            }}
          />
        </label>
        <button onClick={() => {
          setMatrixInputVisible(true);
          setMatrixInputSizeVisible(false);
        }}>
          Enter a matrix of <strong>{matrixNbColumns}</strong> columns and{" "}
          <strong>{matrixNbRows}</strong> rows.
        </button>
      </Parameters>
    </RowContainer>
  );
};

export default MatrixInputSize;
