import React, { useEffect, useState } from "react";
import Method from "../Method";
import MatrixInput from "../../MatrixInput";
import MatrixInputSize from "../../MatrixSizeInput";
import renderLatexMatrix from "../../../utils/renderLatexMatrix";
//import gaussSimpleFunction from "./gaussSimpleFunction";

import styled from "styled-components";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

const GaussSimple = ({ name }) => {
  const [matrixASize, setMatrixASize] = useState({
    rows : 3,
    columns: 3
  });
  const [matrixA, setMatrixA] = useState([]);
  const [latexMatrixA, setLatexMatrixA] = useState(
    "\\begin{pmatrix}\n 1 & 2 & 3\\\\\n a & b & c\n \\end{pmatrix}",
  );
  //const [results, setResults] = useState(gaussSimpleFunction(matrixA));
  const [methodState, setMethodState] = useState({
    matrixA: "inputSize",
    B: undefined,
    solving: undefined,
  });
  useEffect(() => {
    setLatexMatrixA(renderLatexMatrix(matrixA));
  }, [matrixA]);
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
      {methodState.matrixA === "inputSize" ? (
        <MatrixInputSize
          matrixSize={matrixASize}
          setMatrixSize={object => setMatrixASize(object)}
          setMethodState={object => setMethodState(object)}
          methodState={methodState}
        />
      ) : methodState.matrixA === "inputMatrix" ? (
        <MatrixInput
          matrixSize={matrixASize}
          setMatrix={matrix => setMatrixA(matrix)}
          setMethodState={value => setMethodState(value)}
          methodState={methodState}
        />
      ) : (
        methodState.matrixA === "matrix" && (
          <Results>
            <BlockMath math={latexMatrixA} />
          </Results>
        )
      )}
    </Method>
  );
};

const Results = styled("div")`
  font-size: 2rem;
`;

export default GaussSimple;
