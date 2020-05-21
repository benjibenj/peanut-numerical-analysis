import { MatrixParameters, RowContainer, Button } from "../containers/BigContainer";
import React from "react";


const MatrixInputSize = ({
  setMatrixSize,
  matrixSize,
  setMethodState,
  type = "square",
}) => {
  return (
    <RowContainer>
      <MatrixParameters>
        <label>
          {type === "square" ? "Size" : "Number of rows (A)"}
          <input
            type="number"
            min="2"
            max="8"
            defaultValue={matrixSize.rows}
            onChange={e => {
              const rows = parseInt(e.target.value);
              if (2 <= rows && rows <= 8) {
                type !== "square"
                  ? setMatrixSize(prevSize => ({
                      ...prevSize,
                      rows: rows,
                    }))
                  : setMatrixSize(prevSize => ({
                      ...prevSize,
                      columns: rows,
                      rows: rows,
                    }));
              }
            }}
          />
        </label>
        {type !== "square" && (
          <label>
            Number of columns (A)
            <input
              type="number"
              min="2"
              max="8"
              defaultValue={matrixSize.columns}
              onChange={e => {
                const columns = parseInt(e.target.value);
                if (2 <= columns && columns <= 8) {
                  setMatrixSize(prevSize => ({
                    ...prevSize,
                    columns: columns,
                  }));
                }
              }}
            />
          </label>
        )}
        <Button
          onClick={() => {
            setMethodState(prevState => ({
              ...prevState,
              matrixA: "inputMatrix",
            }));
          }}
        >
          Validate A size (<strong>{matrixSize.rows}</strong> rows and{" "}
          <strong>{matrixSize.columns}</strong> columns)
        </Button>
      </MatrixParameters>
    </RowContainer>
  );
};

export default MatrixInputSize;
