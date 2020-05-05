import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  TableStyle,
} from "../../../containers/BigContainer";
import fixedPointFunction from "./fixedPointFunction";
import {methods} from "../../../data/methods";

const FixedPoint = ({name}) => {
  const [functionTextF, setFunctionTextF] = useState("log(sin(x)^2 + 1)-(1/2)-x");
  const [functionTextG, setFunctionTextG] = useState("log(sin(x)^2 + 1)-(1/2)");
  const [initialValue, setInitialValue] = useState(-0.5);
  const [tol, setTol] = useState(1e-7);
  const [results, setResults] = useState(
    fixedPointFunction("log(sin(x)^2 + 1)-(1/2)-x", "log(sin(x)^2 + 1)-(1/2)", -0.5, 1e-7, 100),
  );
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionTextF(event.target.functionTextF.value);
    setFunctionTextG(event.target.functionTextG.value);
    setInitialValue(event.target.initialValue.value);
    setTol(event.target.tol.value);
    setResults(
      fixedPointFunction(
        event.target.functionTextF.value,
        event.target.functionTextG.value,
        parseFloat(event.target.initialValue.value),
        parseFloat(event.target.tol.value),
        parseInt(event.target.maxCount.value),
      ),
    );
  };
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 3)}
      next={methods.find( method => method.index === 5)}
    >
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>
              Function f
              <input
                type="text"
                name="functionTextF"
                defaultValue={functionTextF}
              />
            </label>
            <label>
              Function g
              <input
                type="text"
                name="functionTextG"
                defaultValue={functionTextG}
              />
            </label>
            <label>
              Initial value (x0)
              <input type="text" name="initialValue" defaultValue={initialValue} />
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
                <th>g(xi)</th>
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
                    <td>{result[4]}</td>
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

export default FixedPoint;
