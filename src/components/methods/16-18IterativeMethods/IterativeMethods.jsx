import React, { useEffect, useState } from "react";
import Method from "../Method";
import MatrixInput from "../../MatrixInput";
import MatrixInputSize from "../../MatrixSizeInput";
import renderLatexMatrix from "../../../utils/LaTeX/renderLatexMatrix";
import iterativeMethodsFunctions from "./iterativeMethodsFunctions";

import {
  Parameters,
  Button,
  TableStyle,
  Error,
  Results,
  Inputs,
  Column,
} from "../../../containers/BigContainer";
import styled from "styled-components";

import { format } from "mathjs";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { methods } from "../../../data/methods";
import { Colors } from "../../../rules";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IterativeMethods = ({ name }) => {
  const [matrixASize, setMatrixASize] = useState({
    rows: 4,
    columns: 4,
  });
  const [matrixA, setMatrixA] = useState([
    [4, -1, -0, 3],
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
  const [method, setMethod] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [normValue, setnormValue] = useState(2);
  const [NMax, setNMax] = useState(100);
  const [wValue, setWValue] = useState(1.5);
  const [error, setError] = useState(null);
  const [paramSet, setParamSet] = useState(false);
  const [results, setResults] = useState(undefined);
  const [methodState, setMethodState] = useState({
    matrixA: "inputSize",
    B: "input",
    initialValueX0: "input",
  });
  const handleSubmit = event => {
    event.preventDefault();
    setTol(parseFloat(event.target.tol.value));
    setnormValue(event.target.normValue.value);
    setWValue(event.target.wValue && event.target.wValue.value);
    setNMax(parseInt(event.target.NMax.value));
    setParamSet(true);
  };
  useEffect(() => {
    setError(null);
    setLatexMatrixA(renderLatexMatrix(matrixA));
    setLatexB(renderLatexMatrix(B));
    setLatexInitialValueX0(renderLatexMatrix(initialValueX0));
    if (
      methodState.matrixA === "matrix" &&
      methodState.B === "matrix" &&
      methodState.initialValueX0 === "matrix" &&
      paramSet
    ) {
      try {
        setResults(
          iterativeMethodsFunctions(
            matrixA,
            B,
            initialValueX0,
            tol,
            NMax,
            normValue,
            method,
            wValue,
          ),
        );
      } catch (e) {
        setError(e + "");
        setResults(undefined);
      }
    } else {
      setResults(undefined);
    }
  }, [matrixA, B, methodState, paramSet, NMax, initialValueX0, method, normValue, tol, wValue]);
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 15)}
      next={methods.find(method => method.index === 19)}
      jsAlgorithm={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/16-18IterativeMethods/iterativeMethodsFunctions.js"
      }
      pseudoCode={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/16-18IterativeMethods/pseudoCode/iterativeMethods.pdf"
      }
    >
      <ParametersMatrix>
        {!paramSet ? (
          <React.Fragment>
            <form onSubmit={handleSubmit}>
              <label>
                Method{"  "}
                <select
                  name="method"
                  value={method}
                  onChange={event => setMethod(parseInt(event.target.value))}
                >
                  <option value={1}>Jacobi</option>
                  <option value={2}>Gauss-Seidel</option>
                  <option value={3}>SOR</option>
                </select>
              </label>
              {method === 3 && (
                <label>
                  w value (relaxation parameter)
                  <input
                    type="number"
                    name="wValue"
                    step={0.01}
                    min={0}
                    max={2}
                    defaultValue={wValue}
                  />
                </label>
              )}
              <label>
                Tolerance
                <input type="text" name="tol" defaultValue={tol} />
              </label>
              <label>
                Norm value{"  "}
                <select name="normValue" defaultValue={normValue}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value="inf">inf</option>
                </select>
              </label>
              <label>
                Max iterations (max 100)
                <input type="number" name="NMax" defaultValue={100} />
              </label>
              <Button>Confirm</Button>
            </form>
          </React.Fragment>
        ) : (
          <Column>
            <ul>
              <li>Tolerance : {tol}</li>
              <li>Norm value : {normValue}</li>
              <li>NMax : {NMax}</li>
              <li>
                Method :{" "}
                {method === 1
                  ? "Jacobi"
                  : method === 2
                  ? "Gauss-Seider"
                  : "SOR"}
              </li>
              {method === 3 && (
                <li>w value (relaxation parameter) : {wValue}</li>
              )}
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
              <BlockMath math={"b = " + latexB} />
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
      {results && !error ? (
        <Results>
          <BlockMath math={"T = " + renderLatexMatrix(results.T, 6)} />
          <BlockMath math={"C = " + renderLatexMatrix(results.C, 6)} />
          <p>
            <em>
              There are some issues with the JS library used to calculate the
              eigtenvalues, for a correct value of the spectral radius, use
              MathLab : `max(abs(eig(T)))`.
            </em>
          </p>
          <p>
            <strong>Spectral radius</strong> :{" "}
            {results.spectralRadiance &&
              format(results.spectralRadiance, {
                notation: "fixed",
                precision: 6,
              })}
          </p>
          {!error ? (
            <TableStyle>
              <table>
                <thead>
                  <tr>
                    <th>Iteration (i)</th>
                    <th>Error</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {results.iterations.map((result, index) => {
                    return (
                      <tr key={index}>
                        <td>{result[0]}</td>
                        <td>
                          {result[1] &&
                            format(result[1], {
                              notation: "exponential",
                              precision: 2,
                            })}
                        </td>
                        <td>
                          {result[2] && (
                            <BlockMath math={renderLatexMatrix(result[2], 6)} />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </TableStyle>
          ) : (
            <React.Fragment>
              <Error>{error}</Error>
              <Link to={"/help"}>
                <FontAwesomeIcon icon={"question-circle"} /> Help Page
              </Link>
            </React.Fragment>
          )}
          <p>{results.conclusion && results.conclusion}</p>
        </Results>
      ) : (
        error && (
          <Results>
            <Error>{error}</Error>
            <Link to={"/help"}>
              <FontAwesomeIcon icon={"question-circle"} /> Help Page
            </Link>
          </Results>
        )
      )}
    </Method>
  );
};

const ParametersMatrix = styled(Parameters)`
  display: flex;
  justify-content: center;
  form {
    display: grid;
    grid-template-rows: 75px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-columns: 200px 200px 200px 200px;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    @media (max-width: 990px) {
      grid-template-columns: 200px 200px 200px;
    }
    @media (max-width: 790px) {
      grid-template-columns: 200px 200px;
    }
    @media (max-width: 600px) {
      grid-template-columns: 200px;
    }
  }
  select {
    border: 2px solid ${Colors.primary.ocean.default};
  }
`;

export default IterativeMethods;
