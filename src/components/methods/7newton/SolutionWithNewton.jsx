import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  Params,
} from "../../../containers/BigContainer";

const SolutionWithNewton = ({name}) => {
  const [functionText, setFunctionText] = useState("x^2");
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
  };
  return (
    <Method
      title={name}
      prev={{
        index: 6,
        id: "/methods/fixed-point",
        theme: "one-var",
        name: "Fixed point",
      }}
      next={{
        index: 8,
        id: "/methods/secante",
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
          <strong>{name}</strong>
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
