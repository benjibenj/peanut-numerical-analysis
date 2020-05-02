import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  Params,
} from "../../../containers/BigContainer";

const SolutionWithSecante = () => {
  const title = "Secante method";
  const [functionText, setFunctionText] = useState("x^2");
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
  };
  return (
    <Method
      title={title}
      prev={{
        index: 7,
        id: "/methods/get-solution-newton",
        theme: "one-var",
        name: "Newton method",
      }}
      next={{
        index: 9,
        id: "/methods/get-solution-multiple-roots",
        theme: "one-var",
        name: "Multiple roots",
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

export default SolutionWithSecante;
