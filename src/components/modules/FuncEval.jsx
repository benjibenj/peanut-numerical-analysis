import React, {useState} from "react";
import Method from "../../containers/Method";
import styled from "styled-components";
import {BorderRadius, Colors, Spacing} from "../../rules";

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
      <Container>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>Function<input type="text" name="functionText" placeholder="x^2" /></label>
            <label>Value of x (can be an array)<input type="text" name="x" placeholder="2, [12, 20], ... etc" /></label>
            <button>Apply</button>
          </form>
        </Parameters>
        <Eval>
          <strong>Function Evaluator</strong>
          <Params>
            <ul>
              <li>The input function : {functionText}</li>
              <li>x value : {x}</li>
              <li>f(x) : <strong>{resultEval.toString()}</strong></li>
            </ul>
          </Params>
        </Eval>
      </Container>
    </Method>
  );
};

const Container = styled("div")`
  display: flex;
  flex-direction: row;
`;

const Eval = styled("div")`
  margin: ${Spacing.sm} 0 ${Spacing.lg} ${Spacing.sm};
`;

const Params = styled("div")`
  li{
    margin: ${Spacing.md} 0;
  }
`;

const Parameters = styled("div")`
  label {
    display: block;
    font-weight: bold;
    margin: ${Spacing.sm} 0 ${Spacing.md} 0;
  }
  input {
    display: block;
    margin: ${Spacing.sm} 0;
    border: none;
    font-size: inherit;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
  button {
    font-size: inherit;
    border: 2px solid ${Colors.primary.ocean.default};
    color: ${Colors.primary.ocean.darker};
    border-radius: ${BorderRadius.sm};
    font-weight: bold;
  }
`;

export default FuncEval;
