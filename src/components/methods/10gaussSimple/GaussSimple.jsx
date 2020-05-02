import React, { useState } from "react";
import Method from "../Method";
import MatrixInput from "../../MatrixInput";
import { RowContainer, Parameters } from "../../../containers/BigContainer";

const GaussSimple = ({ name }) => {
  const [matrixNbColumns, setMatrixNbColumns] = useState(3);
  const [matrixNbRows, setMatrixNbRows] = useState(3);
  const [matrix, setMatrix] = useState([]);
  const [matrixInputVisible, setMatrixInputVisible] = useState(false);
  return (
    <Method
      title={name}
      prev={{
        index: 7,
        id: "/methods/multiple-roots",
        theme: "one-var",
        name: "Multiple roots",
      }}
      next={{
        index: 9,
        id: "/methods/gauss-partial",
        theme: "sys-eq",
        name: "Gaussian elimination (partial pivot)",
      }}
    >
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
          <button onClick={() => setMatrixInputVisible(true)}>
            Enter a matrix of <strong>{matrixNbColumns}</strong> columns
            and <strong>{matrixNbRows}</strong> rows.
          </button>
        </Parameters>
      </RowContainer>
      {matrixInputVisible && (
        <MatrixInput
          matrixNbColumns={matrixNbColumns}
          matrixNbRows={matrixNbRows}
          setMatrix={() => setMatrix}
          setMatrixInputVisible={() => setMatrixInputVisible}
        />
      )}
    </Method>
  );
};

export default GaussSimple;
