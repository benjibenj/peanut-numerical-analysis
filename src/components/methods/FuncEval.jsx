import React, {useState} from "react";
import Method from "./Method";
import {RowContainer, Parameters, Eval, Params} from "../../containers/BigContainer";

import * as Algebrite from "algebrite";

const FuncEval = () => {
  const title = "Function Evaluator";
  const subTitle = "This method simply evaluates each value passed (x) with the function selected (f(x)).";
  const [functionText, setFunctionText] = useState("x^2");
  const [x, setX] = useState(2);
  const [resultEval, setResultEval] = useState(Algebrite.eval("x^2", "x", 2));
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
    setX(event.target.x.value);
    setResultEval(Algebrite.eval(event.target.functionText.value, "x", event.target.x.value));
  };
  return (
    <Method
      title={title}
      subTitle={subTitle}
      >
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>Function<input type="text" name="functionText" placeholder="x^2" /></label>
            <label>Value of x (can be an array)<input type="text" name="x" placeholder="2, [12, 20], ... etc" /></label>
            <button>Apply</button>
          </form>
        </Parameters>
        <Eval>
          <strong>{title}</strong>
          <Params>
            <ul>
              <li>The input function : {functionText}</li>
              <li>x value : {x}</li>
              <li>f(x) : <strong>{resultEval.toString()}</strong></li>
            </ul>
          </Params>
        </Eval>
      </RowContainer>
    </Method>
  );
};

export default FuncEval;
