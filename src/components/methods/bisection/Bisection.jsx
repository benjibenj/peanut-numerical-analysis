import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  Params,
} from "../../../containers/BigContainer";

import bisectionFunction from "./bisectionFunction";

const Bisection = () => {
  const title = "Bisection";
  const [functionText, setFunctionText] = useState("ln(sin(x)^2 + 1)-0.5");
  const [lowValue, setLowValue] = useState(0);
  const [highValue, setHighValue] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [result, setResult] = useState(bisectionFunction(
    "ln(sin(x)^2 + 1)-0.5",
    0,
    1,
    1e-7,
    100,
  ),);
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
    setLowValue(event.target.lowValue.value);
    setHighValue(event.target.highValue.value);
    setTol(event.target.tol.value);
    setResult(
      bisectionFunction(
        event.target.functionText.value,
        parseFloat(event.target.lowValue.value),
        parseFloat(event.target.highValue.value),
        parseInt(event.target.tol.value),
        parseInt(event.target.maxCount.value),
      ),
    );
  };
  return (
    <Method title={title}>
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>
              Function
              <input
                type="text"
                name="functionText"
                placeholder="ln(sin(x)^2 + 1)-0.5"
              />
            </label>
            <label>
              Lower interval value (a)
              <input type="text" name="lowValue" placeholder="0" />
            </label>
            <label>
              Higher interval value (b)
              <input type="text" name="highValue" placeholder="1" />
            </label>
            <label>
              Tolerance
              <input type="text" name="tol" placeholder="1e-7" />
            </label>
            <label>
              Max iterations (max 100)
              <input type="text" name="maxCount" placeholder="100" />
            </label>
            <button>Run</button>
          </form>
        </Parameters>
        <Eval>
          <strong>{title}</strong>
          <Params>
            <ul>
              <li>The input function : {functionText}</li>
              <li>Input a : {lowValue}</li>
              <li>Input b : {highValue}</li>
              <li>Tolerance (Tol) : {tol}</li>
              <li>Result : <strong>{result && result[7]}</strong></li>
              <li>Last a : {result && result[0]}</li>
              <li>Last b : {result && result[1]}</li>
              <li>Last m : {result && result[2]}</li>
              <li>f(a) : {result && result[3]}</li>
              <li>f(b) : {result && result[4]}</li>
              <li>Error : {result && result[5]}</li>
              <li>Number of iterations : {result && result[6]}</li>
            </ul>
          </Params>
        </Eval>
      </RowContainer>
    </Method>
  );
};

export default Bisection;
