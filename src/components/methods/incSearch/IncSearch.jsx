import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  Params,
} from "../../../containers/BigContainer";

import incSearchFunction from "./incSearchFunction";

const IncSearch = () => {
  const title = "Incremental Search";
  const [functionText, setFunctionText] = useState("x^2");
  const [initialValue, setInitialValue] = useState(-10);
  const [delta, setDelta] = useState(0.1);
  const [result, setResult] = useState(incSearchFunction("x^2 - 1", 0, 0.1, 100));
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
    setInitialValue(event.target.initialValue.value);
    setDelta(event.target.delta.value);
    setResult(incSearchFunction(event.target.functionText.value, parseFloat(event.target.initialValue.value), parseFloat(event.target.delta.value), parseInt(event.target.maxCount.value)));
  };
  return (
    <Method title={title}>
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>
              Function
              <input type="text" name="functionText" placeholder="x^2" />
            </label>
            <label>
              Initial value
              <input type="text" name="initialValue" placeholder="0" />
            </label>
            <label>
              Delta
              <input type="text" name="delta" placeholder="0.1" />
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
              <li>Initial value : {initialValue}</li>
              <li>Delta : {delta}</li>
              <li>a : {result[0]}</li>
              <li>b : {result[1]}</li>
              <li>f(a) : {result[2]}</li>
              <li>f(b) : {result[3]}</li>
              <li>Number of iterations : {result[4]}</li>
            </ul>
          </Params>
        </Eval>
      </RowContainer>
    </Method>
  );
};

export default IncSearch;
