import React, { useEffect, useState } from "react";
import Method from "../Method";
import MatrixInput from "../../MatrixInput";
import MatrixInputSize from "../../MatrixSizeInput";
import renderLatexMatrix from "../../../utils/renderLatexMatrix";
import jacobiFunction from "./JacobiFunction";

import styled from "styled-components";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import {methods} from "../../../data/methods";

const Jacobi = ({ name }) => {
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
  const [results, setResults] = useState(undefined);
  const [methodState, setMethodState] = useState({
    matrixA: "inputSize",
    B: "input",
    solving: undefined,
  });
  useEffect(() => {
    setLatexMatrixA(renderLatexMatrix(matrixA));
    setLatexB(renderLatexMatrix(B));
    if (matrixA.length !== 0 && B.length !== 0) {
      setResults(jacobiFunction(matrixA, B));
    }
  }, [matrixA, B]);
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 15)}
      next={methods.find( method => method.index === 17)}
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
            <BlockMath math={"A = " + latexMatrixA} />
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
          methodState.B === "matrix" && <BlockMath math={"B = " + latexB} />
        )}
      </Inputs>
      {results && (
        <Results>
          {results.iterations.map((matrix, index) => {
            return (
              <BlockMath
                key={index}
                math={"Step " + index + " = " + renderLatexMatrix(matrix)}
              />
            );
          })}
          <p>{results.conclusion}</p>
          <BlockMath math={"x = " + renderLatexMatrix(results.finalSolution)} />
        </Results>
      )}
    </Method>
  );
};

const Results = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Inputs = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export default Jacobi;
