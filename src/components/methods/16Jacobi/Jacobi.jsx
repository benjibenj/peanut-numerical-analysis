import React, { useEffect, useState } from "react";
import Method from "../Method";
import MatrixInput from "../../MatrixInput";
import MatrixInputSize from "../../MatrixSizeInput";
import renderLatexMatrix from "../../../utils/renderLatexMatrix";
import jacobiFunction from "./JacobiFunction";

import { Parameters, Button } from "../../../containers/BigContainer";
import styled from "styled-components";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { methods } from "../../../data/methods";
import { Colors } from "../../../rules";

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
  const [NMax, setNMax] = useState(100);
  const [paramSet, setParamSet] = useState(false);
  const [results, setResults] = useState(undefined);
  const [methodState, setMethodState] = useState({
    matrixA: "inputSize",
    B: "input",
    initialValueX0: "input",
    solving: undefined,
  });
  const handleSubmit = event => {
    event.preventDefault();
    setTol(parseFloat(event.target.tol.value));
    setNorm(event.target.norm.value);
    setNMax(parseInt(event.target.NMax.value));
    setParamSet(true);
  };
  useEffect(() => {
    setLatexMatrixA(renderLatexMatrix(matrixA));
    setLatexB(renderLatexMatrix(B));
    setLatexInitialValueX0(renderLatexMatrix(initialValueX0));
    if (
      methodState.matrixA === "matrix" &&
      methodState.B === "matrix" &&
      methodState.initialValueX0 === "matrix" &&
      paramSet
    ) {
      setResults(jacobiFunction(matrixA, B, initialValueX0, tol, NMax, norm));
    } else {
      setResults(undefined);
    }
  }, [matrixA, B, methodState, paramSet]);
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 15)}
      next={methods.find(method => method.index === 17)}
    >
      <ParametersMatrix>
        {!paramSet ? (
          <form onSubmit={handleSubmit}>
            <label>
              Tolerance
              <input type="text" name="tol" defaultValue={tol} />
            </label>
            <label>
              Norm{" "}
              <select name="norm" defaultValue={norm}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="inf">inf</option>
              </select>
            </label>
            <label>
              Max iterations (max 100)
              <input type="number" name="NMax" defaultValue={100} />
            </label>
            <Button>Confirm</Button>
          </form>
        ) : (
          <Column>
            <ul>
              <li>Tolerance : {tol}</li>
              <li>Norm : {norm}</li>
              <li>NMax : {NMax}</li>
            </ul>
            <Button onClick={() => setParamSet(false)}>
              Change parameters
            </Button>
          </Column>
        )}
      </ParametersMatrix>
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
            <Button
              onClick={() => {
                setMethodState(prevState => ({
                  ...prevState,
                  matrixA: "inputSize",
                }));
              }}
            >
              Change matrix size
            </Button>
          </Column>
        ) : (
          methodState.matrixA === "matrix" && (
            <Column>
              <BlockMath math={"A = " + latexMatrixA} />
              <Button
                onClick={() => {
                  setMethodState(prevState => ({
                    ...prevState,
                    matrixA: "inputMatrix",
                  }));
                }}
              >
                Change A
              </Button>
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
              <Button
                onClick={() => {
                  setMethodState(prevState => ({
                    ...prevState,
                    initialValueX0: "input",
                  }));
                }}
              >
                Change x0
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
                    B: "input",
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
          <BlockMath
            math={"D = " + renderLatexMatrix(results.D)}
          />
          <BlockMath
            math={"L = " + renderLatexMatrix(results.L)}
          />
          <BlockMath
            math={"U = " + renderLatexMatrix(results.U)}
          />
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

const ParametersMatrix = styled(Parameters)`
  display: flex;
  justify-content: center;
  form {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
  }
  select {
    border: 2px solid ${Colors.primary.ocean.default};
  }
`;

export default Jacobi;
