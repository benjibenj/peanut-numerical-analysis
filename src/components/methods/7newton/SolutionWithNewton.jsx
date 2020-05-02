import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  Params,
} from "../../../containers/BigContainer";

const SolutionWithNewton = () => {
  const title = "Newton method";
  const [functionText, setFunctionText] = useState("x^2");
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
  };
  return (
    <Method
      title={title}
      prev={{
        index: 6,
        id: "/methods/get-solution-fixed-point",
        theme: "one-var",
        name: "Fixed point",
      }}
      next={{
        index: 8,
        id: "/methods/get-solution-secante",
        theme: "one-var",
        name: "Secant method",
      }}
    >
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>
              Function
              <input type="text" name="functionText" placeholder="x^2" />
            </label>
            <button>Apply</button>
          </form>
        </Parameters>
        <Eval>
          <strong>{title}</strong>
          <Params>
            <ul>
              <li>The input function : {functionText}</li>
            </ul>
          </Params>
        </Eval>
      </RowContainer>
    </Method>
  );
};

export default SolutionWithNewton;
