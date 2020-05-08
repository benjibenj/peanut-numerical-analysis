import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  TableStyle,
  Button
} from "../../../containers/BigContainer";
import newtonFunction from ".//newtonFunction";
import {methods} from "../../../data/methods";

const SolutionWithNewton = ({name}) => {
  const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1)-(1/2)");
  const [functionDerivative, setFunctionDerivative] = useState("2*(1/(sin(x)^2 + 1))*(sin(x)*cos(x))");
  const [initialValueX0, setInitialValueX0] = useState(0.5);
  const [tol, setTol] = useState(1e-7);
  const [results, setResults] = useState(
    newtonFunction("log(sin(x)^2 + 1)-(1/2)", "2*(1/(sin(x)^2 + 1))*(sin(x)*cos(x))", 0.5, 1e-7, 100),
  );
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
    setFunctionDerivative(event.target.functionDerivative.value);
    setInitialValueX0(event.target.initialValueX0.value);
    setTol(event.target.tol.value);
    setResults(
      newtonFunction(
        event.target.functionText.value,
        event.target.functionDerivative.value,
        parseFloat(event.target.initialValueX0.value),
        parseFloat(event.target.tol.value),
        parseInt(event.target.maxCount.value),
      ),
    );
  };
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 4)}
      next={methods.find( method => method.index === 6)}
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
                name="functionDerivative"
                defaultValue={functionDerivative}
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

export default SolutionWithNewton;
