import React, { useState } from "react";
import Method from "../Method";
import MatrixInput from "../../MatrixInput";
import MatrixInputSize from "../../MatrixSizeInput";

const GaussSimple = ({ name }) => {
  const [matrixNbColumns, setMatrixNbColumns] = useState(3);
  const [matrixNbRows, setMatrixNbRows] = useState(3);
  const [matrix, setMatrix] = useState([]);
  const [matrixInputSizeVisible, setMatrixInputSizeVisible] = useState(true);
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
      {matrixInputSizeVisible && (
        <MatrixInputSize
          matrixNbColumns={matrixNbColumns}
          matrixNbRows={matrixNbRows}
          setMatrixNbRows={nb => setMatrixNbRows(nb)}
          setMatrixNbColumns={nb => setMatrixNbColumns(nb)}
          setMatrixInputSizeVisible={value => setMatrixInputSizeVisible(value)}
          setMatrixInputVisible={value => setMatrixInputVisible(value)}
        />
      )}
      {matrixInputVisible && (
        <MatrixInput
          matrixNbColumns={matrixNbColumns}
          matrixNbRows={matrixNbRows}
          setMatrix={matrix => setMatrix(matrix)}
          setMatrixInputVisible={value => setMatrixInputVisible(value)}
        />
      )}
    </Method>
  );
};

export default GaussSimple;
