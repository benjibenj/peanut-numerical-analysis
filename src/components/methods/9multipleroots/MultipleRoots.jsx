import React, {useState} from "react";
import Method from "../Method";
import {RowContainer, Parameters, Eval, Params} from "../../../containers/BigContainer";

const MultipleRoots = ({name}) => {
  const [functionText, setFunctionText] = useState("x^2");
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
  };
  return (
    <Method
      title={name}
    >
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>Function<input type="text" name="functionText" placeholder="x^2" /></label>
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

export default MultipleRoots;
