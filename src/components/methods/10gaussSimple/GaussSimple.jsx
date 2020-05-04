import React, { useEffect, useState } from "react";
import Method from "../Method";
import MatrixInput from "../../MatrixInput";
import MatrixInputSize from "../../MatrixSizeInput";

import styled from "styled-components";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

const GaussSimple = ({ name }) => {
  const [matrixNbColumns, setMatrixNbColumns] = useState(3);
  const [matrixNbRows, setMatrixNbRows] = useState(3);
  const [matrix, setMatrix] = useState([]);
  const [matrixInputSizeVisible, setMatrixInputSizeVisible] = useState(true);
  const [matrixInputVisible, setMatrixInputVisible] = useState(false);
  const [matrixVisible, setMatrixVisible] = useState(false);
  const [latexMatrix, setLatexMatrix] = useState(
    "\\begin{pmatrix}\n 1 & 2 & 3\\\\\n a & b & c\n \\end{pmatrix}",
  );
  useEffect(() => {
    const latexMatrixTemp =
      "\\begin{pmatrix}\n" +
      matrix.map((row, index) => {
        if (index === matrix.length) return row.join(" & ") + "\n";
        else return row.join(" & ") + "\\\\\n";
      }).join("") +
      "\\end{pmatrix}";
    setLatexMatrix(latexMatrixTemp);
  }, [matrix]);
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
          setMatrixVisible={value => setMatrixVisible(value)}
        />
      )}
      {matrixVisible && (
        <Matrix>
          <BlockMath math={latexMatrix} />
        </Matrix>
      )}
    </Method>
  );
};

const Matrix = styled("div")``;

export default GaussSimple;
