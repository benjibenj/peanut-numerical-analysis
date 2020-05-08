import React, { useEffect, useState } from "react";
import Method from "../Method";
import MatrixInput from "../../MatrixInput";
import MatrixInputSize from "../../MatrixSizeInput";
import renderLatexMatrix from "../../../utils/renderLatexMatrix";
import jacobiFunction from "./JacobiFunction";

import {Button} from "../../../containers/BigContainer";

import styled from "styled-components";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { methods } from "../../../data/methods";

const Jacobi = ({ name }) => {
  const [matrixASize, setMatrixASize] = useState({
    rows: 4,
    columns: 4,
  });
  const [matrixA, setMatrixA] = useState([
    [4, -1, 0, 3],
    [1, 15.5, 3, 8],
    [0, -1.3, -4, 1.1],
    [14, 5, -2, 30],
  ]);
  const [B, setB] = useState([[1], [1], [1], [1]]);
  const [latexMatrixA, setLatexMatrixA] = useState(
    "\\begin{pmatrix}\n 1 & 2 & 3\\\\\n a & b & c\n \\end{pmatrix}",
  );
  const [latexB, setLatexB] = useState(
    "\\begin{pmatrix}\n a\\\\\n b\n \\end{pmatrix}",
  );
  const [latexInitialValueX0, setLatexInitialValueX0] = useState(
    "\\begin{pmatrix}\n a\\\\\n b\n \\end{pmatrix}",
  );
  const [initialValueX0, setInitialValueX0] = useState([[0], [0], [0], [0]]);
  const [tol, setTol] = useState(1e-7);
  const [norm, setNorm] = useState(2);
  const [results, setResults] = useState(undefined);
  const [methodState, setMethodState] = useState({
    matrixA: "inputSize",
    B: "input",
    initialValueX0: "input",
    solving: undefined,
  });
  useEffect(() => {
    setLatexMatrixA(renderLatexMatrix(matrixA));
    setLatexB(renderLatexMatrix(B));
    setLatexInitialValueX0(renderLatexMatrix(initialValueX0));
    if (methodState.matrixA === "matrix" && methodState.B === "matrix" && methodState.initialValueX0 === "matrix") {
      setResults(jacobiFunction(matrixA, B));
    } else {
      setResults(undefined);
    }
  }, [matrixA, B, methodState]);
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 15)}
      next={methods.find(method => method.index === 17)}
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
          <Column>
          <MatrixInput
            type={"A"}
            matrix={matrixA}
            matrixSize={matrixASize}
            setMatrix={matrix => setMatrixA(matrix)}
            setMethodState={value => setMethodState(value)}
          />
          <Button onClick={() => {
            setMethodState(prevState => ({
              ...prevState,
              matrixA: "inputSize",
            }));
          }}>Change matrix size</Button>
          </Column>
        ) : (
          methodState.matrixA === "matrix" && (
            <Column>
              <BlockMath math={"A = " + latexMatrixA} />
              <Button onClick={() => {
                setMethodState(prevState => ({
                  ...prevState,
                  matrixA: "inputMatrix",
                }));
              }}>Change A</Button>
            </Column>
          )
        )}
        {methodState.initialValueX0 === "input" ? (
          <MatrixInput
            type={"initialValueX0"}
            matrix={initialValueX0}
            matrixSize={{ ...matrixASize, columns: 1 }}
            setMatrix={matrix => setInitialValueX0(matrix)}
            setMethodState={value => setMethodState(value)}
          />
        ) : (
          methodState.initialValueX0 === "matrix" && (
          <Column>
            <BlockMath math={"x0 = " + latexInitialValueX0} />
            <Button onClick={() => {
              setMethodState(prevState => ({
                ...prevState,
                initialValueX0: "input",
              }));
            }}>Change x0</Button>
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
          methodState.B === "matrix" &&  (
          <Column>
            <BlockMath math={"B = " + latexB} />
            <Button onClick={() => {
              setMethodState(prevState => ({
                ...prevState,
                B: "input",
              }));
            }}>Change B</Button>
          </Column>
            )
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

const Column = styled("div")`
  display: flex;
  flex-direction: column;
`;

export default Jacobi;
