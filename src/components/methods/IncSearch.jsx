import React, { useState } from "react";
import Method from "./Method";
import {
  RowContainer,
  Parameters,
  Eval,
  Params,
} from "../../containers/BigContainer";

const IncSearch = () => {
  const title = "Incremental Search";
  const pseudoCode = {__html: "<h3>The user needs to guarantee that there is no discontinuity in the function with" +
      " the numbers that are going to be entered</h3>" +
      "<h4>Steps</h4>" +
      "<ol>"+
      "<li>Ask the user for a function</li>"+
      "<li>Ask the user to input an initial value to find the root of the function that is the " +
      "closest to this given value. This vaiable we will call A.</li>" +
      "<li>Ask the user to input a “delta” value that will allow us to make sums to determine " +
      "the value of B(B=A+delta). With this value of delta we are going to make the " +
      "successive summations to find the interval where the root is.</li>" +
      "<li>We evaluate the values of A and B in the function to obtain f(A) and f(B).</li>" +
      "<li>Now we make a cycle: while f(A)∗ f(B)>0, do</li>" +
      "<ol type='a'>" +
      "<li>A=B</li>"+
      "<li>f(A)=f(B)</li>"+
      "<li>B=B+delta</li>"+
      "<li>f(B) = the new value of B evaluated in the function.</li>"+
      "</ol>"+
      "<li>The cycle will stop when f(A)∗ f(B) < 0, or to explain, when there is a change in " +
      "the sign. This means that in this interval there is a root. We now have ourselves " +
      "an interval [A,B] in which we know there is a root of the function f(X).</li>" +
        "</ol>"
  };
  const [functionText, setFunctionText] = useState("x^2");
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
  };
  return (
    <Method title={title} pseudoCode={pseudoCode}>
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

export default IncSearch;
