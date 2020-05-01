import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  TableStyle,
} from "../../../containers/BigContainer";

import bisectionFunction from "./bisectionFunction";

const Bisection = () => {
  const title = "Bisection";
  const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1)-(1/2)");
  const [lowValue, setLowValue] = useState(0);
  const [highValue, setHighValue] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [results, setResults] = useState(
    bisectionFunction("log(sin(x)^2 + 1)-(1/2)", 0, 1, 1e-7, 100),
  );
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
    setLowValue(event.target.lowValue.value);
    setHighValue(event.target.highValue.value);
    setTol(event.target.tol.value);
    setResults(
      bisectionFunction(
        event.target.functionText.value,
        parseFloat(event.target.lowValue.value),
        parseFloat(event.target.highValue.value),
        parseFloat(event.target.tol.value),
        parseInt(event.target.maxCount.value),
      ),
    );
  };
  return (
    <Method
      title={title}
      prev={{ index: 3,  id: "/methods/incremental-search", theme: "one-var", name: "Incremental search"}}
      next={{ index: 5,  id: "/methods/get-solution-false-position", theme: "one-var", name: "False position" }}
    >
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>
              Function
              <input
                type="text"
                name="functionText"
                defaultValue={functionText}
              />
            </label>
            <label>
              Lower interval value (a)
              <input type="text" name="lowValue" defaultValue={lowValue} />
            </label>
            <label>
              Higher interval value (b)
              <input type="text" name="highValue" defaultValue={highValue} />
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
          <strong>{title}</strong>
          <TableStyle>
            <table>
              <thead>
              <tr>
                <th>Iteration</th>
                <th>a</th>
                <th>xm</th>
                <th>b</th>
                <th>f(xm)</th>
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
                    <td>{result[4]}</td>
                    <td>{result[5]}</td>
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

export default Bisection;
