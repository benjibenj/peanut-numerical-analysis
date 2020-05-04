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
    rows: 3,
    columns: 3,
  });
  const [matrixA, setMatrixA] = useState([]);
  const [B, setB] = useState([]);
  const [latexMatrixA, setLatexMatrixA] = useState(
    "\\begin{pmatrix}\n 1 & 2 & 3\\\\\n a & b & c\n \\end{pmatrix}",
  );
  const [latexB, setLatexB] = useState(
    "\\begin{pmatrix}\n a\\\\\n b\n \\end{pmatrix}",
  );
  //const [results, setResults] = useState(gaussSimpleFunction(matrixA));
  const [methodState, setMethodState] = useState({
    matrixA: "inputSize",
    B: "input",
    solving: undefined,
  });
  useEffect(() => {
    setLatexMatrixA(renderLatexMatrix(matrixA));
    setLatexB(renderLatexMatrix(B));
  }, [matrixA, B]);
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
      <Inputs>
      {methodState.matrixA === "inputSize" ? (
        <MatrixInputSize
          matrixSize={matrixASize}
          setMatrixSize={object => setMatrixASize(object)}
          setMethodState={object => setMethodState(object)}
          methodState={methodState}
        />
      ) : methodState.matrixA === "inputMatrix" ? (
        <MatrixInput
          type={"A"}
          matrixSize={matrixASize}
          setMatrix={matrix => setMatrixA(matrix)}
          setMethodState={value => setMethodState(value)}
        />
      ) : (
        methodState.matrixA === "matrix" && (
          <Results>
            <BlockMath math={"A = " + latexMatrixA} />
          </Results>
        )
      )}
      {methodState.B === "input" ? (
        <MatrixInput
          type={"B"}
          matrixSize={{ ...matrixASize, columns: 1 }}
          setMatrix={matrix => setB(matrix)}
          setMethodState={value => setMethodState(value)}
        />
      ) : (
        methodState.B === "matrix" && (
          <Results>
            <BlockMath math={"B = " + latexB} />
          </Results>
        )
      )}
      </Inputs>
    </Method>
  );
};

const Results = styled("div")`
  font-size: 2rem;
`;

const Inputs = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export default GaussSimple;
