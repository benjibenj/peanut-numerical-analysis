import React, { useEffect, useState } from "react";
import Method from "../Method";
import MatrixInput from "../../MatrixInput";
import MatrixInputSize from "../../MatrixSizeInput";
import renderLatexMatrix from "../../../utils/LaTeX/renderLatexMatrix";
import croultFunction from "./croultFunction";

import styled from "styled-components";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { methods } from "../../../data/methods";
import { Button, Results, Inputs } from "../../../containers/BigContainer";

const Croult = ({ name }) => {
  const [matrixASize, setMatrixASize] = useState({
    rows: 4,
    columns: 4
  });
  const [matrixA, setMatrixA] = useState([
    [4, -1, -0, 3],
    [1, 15.5, 3, 8],
    [0, -1.3, -4, 1.1],
    [14, 5, -2, 30]
  ]);
  const [B, setB] = useState([[1], [1], [1], [1]]);
  const [latexMatrixA, setLatexMatrixA] = useState(
    "\\begin{pmatrix}\n 1 & 2 & 3\\\\\n a & b & c\n \\end{pmatrix}"
  );
  const [latexB, setLatexB] = useState(
    "\\begin{pmatrix}\n a\\\\\n b\n \\end{pmatrix}"
  );
  const [results, setResults] = useState(undefined);
  const [methodState, setMethodState] = useState({
    matrixA: "inputSize",
    B: "input",
    solving: undefined
  });
  useEffect(() => {
    setLatexMatrixA(renderLatexMatrix(matrixA));
    setLatexB(renderLatexMatrix(B));
    if (methodState.matrixA === "matrix" && methodState.B === "matrix") {
      setResults(croultFunction(matrixA, B));
    } else {
      setResults(undefined);
    }
  }, [matrixA, B, methodState]);
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 12)}
      next={methods.find(method => method.index === 14)}
      jsAlgorithm={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/13Croult/croultFunction.js"
      }
      pseudoCode={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/13Croult/pseudoCode/croult.pdf"
      }
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
            matrix={matrixA}
            matrixSize={matrixASize}
            setMatrix={matrix => setMatrixA(matrix)}
            setMethodState={value => setMethodState(value)}
          />
        ) : (
          methodState.matrixA === "matrix" && (
            <Column>
              <BlockMath math={"A = " + latexMatrixA} />
              <Button
                onClick={() => {
                  setMethodState(prevState => ({
                    ...prevState,
                    matrixA: "inputMatrix"
                  }));
                }}
              >
                Change A
              </Button>
            </Column>
          )
        )}
        {methodState.B === "input" ? (
          <MatrixInput
            type={"B"}
            matrix={B}
            matrixSize={{ ...matrixASize, columns: 1 }}
            setMatrix={matrix => setB(matrix)}
            setMethodState={value => setMethodState(value)}
          />
        ) : (
          methodState.B === "matrix" && (
            <Column>
              <BlockMath math={"B = " + latexB} />
              <Button
                onClick={() => {
                  setMethodState(prevState => ({
                    ...prevState,
                    B: "input"
                  }));
                }}
              >
                Change B
              </Button>
            </Column>
          )
        )}
      </Inputs>
      {results && (
        <Results>
          {results.iterations.map((matrix, index) => {
            return (
              <React.Fragment key={index}>
                <p>Step {index + 1}</p>
                <BlockMath math={"L = " + renderLatexMatrix(matrix.L, 6)} />
                <BlockMath math={"U = " + renderLatexMatrix(matrix.U, 6)} />
              </React.Fragment>
            );
          })}
          <p>{results.conclusion}</p>
          <BlockMath
            math={"x = " + renderLatexMatrix(results.finalSolution, 6)}
          />
        </Results>
      )}
    </Method>
  );
};

const Column = styled("div")`
  display: flex;
  flex-direction: column;
`;

export default Croult;
