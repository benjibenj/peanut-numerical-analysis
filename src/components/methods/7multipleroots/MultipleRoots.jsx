import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  TableStyle,
  Button
} from "../../../containers/BigContainer";
import multipleRootsFunction from "./multipleRootsFunction";
import {methods} from "../../../data/methods";

const MultipleRoots = ({ name }) => {
  const [functionText, setFunctionText] = useState("exp(x) - x - 1");
  const [firstDerivate, setFirstDerivate] = useState("exp(x) - 1");
  const [secondDerivate, setSecondDerivate] = useState("exp(x)");
  const [initialValueX0, setInitialValueX0] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [results, setResults] = useState(
    multipleRootsFunction("exp(x) - x - 1", "exp(x) - 1", "exp(x)",1,  1e-7, 100),
  );
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
    setFirstDerivate(event.target.firstDerivate.value);
    setSecondDerivate(event.target.secondDerivate.value);
    setInitialValueX0(event.target.initialValueX0.value);
    setTol(event.target.tol.value);
    setResults(
      multipleRootsFunction(
        event.target.functionText.value,
        event.target.firstDerivate.value,
        event.target.secondDerivate.value,
        parseFloat(event.target.initialValueX0.value),
        parseFloat(event.target.tol.value),
        parseInt(event.target.maxCount.value),
      ),
    );
  };
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 6)}
      next={methods.find( method => method.index === 8)}
    >
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>
              Function f
              <input
                type="text"
                name="functionText"
                defaultValue={functionText}
              />
            </label>
            <label>
              Function f' (first derivative of f)
              <input
                type="text"
                name="firstDerivate"
                defaultValue={firstDerivate}
              />
            </label>
            <label>
              Function f'' (second derivative of f)
              <input
                type="text"
                name="secondDerivate"
                defaultValue={secondDerivate}
              />
            </label>
            <label>
              Initial value (x0)
              <input type="text" name="initialValueX0" defaultValue={initialValueX0} />
            </label>
            <label>
              Tolerance
              <input type="text" name="tol" defaultValue={tol} />
            </label>
            <label>
              Max iterations (max 100)
              <input type="text" name="maxCount" defaultValue={100} />
            </label>
            <Button>Run</Button>
          </form>
        </Parameters>
        <Eval>
          <strong>{name}</strong>
          <TableStyle>
            <table>
              <thead>
              <tr>
                <th>Iteration (i)</th>
                <th>xi</th>
                <th>f(xi)</th>
                <th>E</th>
              </tr>
              </thead>
              <tbody>
              {results.iterations.map((result, index) => {
                return (
                  <tr key={index}>
                    <td>{result[0]}</td>
                    <td>{result[1]}</td>
                    <td>{result[2]}</td>
                    <td>{result[3]}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <p>{results.conclusion}</p>
          </TableStyle>
        </Eval>
      </RowContainer>
    </Method>
  );
};

export default MultipleRoots;
