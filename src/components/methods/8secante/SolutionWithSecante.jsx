import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  TableStyle,
} from "../../../containers/BigContainer";
import secanteFunction from "./secanteFunction";

const SolutionWithSecante = ({name}) => {
  const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1)-(1/2)");
  const [initialValueX0, setInitialValueX0] = useState(0.5);
  const [initialValueX1, setInitialValueX1] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [results, setResults] = useState(
    secanteFunction("log(sin(x)^2 + 1)-(1/2)", 0.5, 1, 1e-7, 100),
  );
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
    setInitialValueX0(event.target.initialValueX0.value);
    setInitialValueX1(event.target.initialValueX1.value);
    setTol(event.target.tol.value);
    setResults(
      secanteFunction(
        event.target.functionText.value,
        parseFloat(event.target.initialValueX0.value),
        parseFloat(event.target.initialValueX1.value),
        parseFloat(event.target.tol.value),
        parseInt(event.target.maxCount.value),
      ),
    );
  };
  return (
    <Method
      title={name}
      prev={{
        index: 7,
        id: "/methods/newton-raphson",
        theme: "one-var",
        name: "Newton method",
      }}
      next={{
        index: 9,
        id: "/methods/multiple-roots",
        theme: "one-var",
        name: "Multiple roots",
      }}
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
              Initial value (x0)
              <input type="text" name="initialValueX0" defaultValue={initialValueX0} />
            </label>
            <label>
              Initial value (x1)
              <input type="text" name="initialValueX1" defaultValue={initialValueX1} />
            </label>
            <label>
              Tolerance
              <input type="text" name="tol" defaultValue={tol} />
            </label>
            <label>
              Max iterations (max 100)
              <input type="text" name="maxCount" defaultValue={100} />
            </label>
            <button>Run</button>
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

export default SolutionWithSecante;
