import { Parameters, RowContainer } from "../containers/BigContainer";
import React from "react";

const MatrixInputSize = (
  {
    setMatrixSize,
    matrixSize,
    setMethodState,
  }
) => {
  return (
    <RowContainer>
      <Parameters>
        <label>
          Number of rows (A)
          <input
            type="number"
            min="2"
            max="8"
            defaultValue={3}
            onChange={e => {
              const rows = parseInt(e.target.value);
              if (2 <= rows && rows <= 8) {
                setMatrixSize(prevSize => ({
                  ...prevSize,
                  rows: rows
                }));
              }
            }}
          />
        </label>
        <label>
          Number of rows columns (A)
          <input
            type="number"
            min="2"
            max="8"
            defaultValue={3}
            onChange={e => {
              const columns = parseInt(e.target.value);
              if (2 <= columns && columns <= 8) {
                setMatrixSize(prevSize => ({
                  ...prevSize,
                  columns: columns
                }));
              }
            }}
          />
        </label>
        <button onClick={() => {
          setMethodState(prevState => ({
            ...prevState,
            matrixA: "inputMatrix"
          }));
        }}>
          Validate A size (<strong>{matrixSize.rows}</strong> rows and{" "}
          <strong>{matrixSize.columns}</strong> columns)
        </button>
      </Parameters>
    </RowContainer>
  );
};

export default MatrixInputSize;
