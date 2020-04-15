import React, { useState } from "react";
import Method from "./Method";
import {
  RowContainer,
  Parameters,
  Eval,
  Params,
} from "../../containers/BigContainer";

import * as Algebrite from "algebrite";

const incrementalSearch = (functionText, initialValue, delta, maxCount) => {
  if (maxCount > 100){
    maxCount = 100;
  }
  let count = 0;
  let a = initialValue;
  let b = initialValue + delta;
  let fA = parseFloat(Algebrite.eval(functionText, "x", a).toString());
  let fB = parseFloat(Algebrite.eval(functionText, "x", b).toString());
  while (fA*fB > 0 && count < maxCount ) {
    a = b;
    fA = fB;
    b = b+delta;
    fB = parseFloat(Algebrite.eval(functionText, "x", b).toString());
    count += 1;
  }
  return [a, b, fA, fB, count];
};

const IncSearch = () => {
  const title = "Incremental Search";
  const pseudoCode = {__html: "<h3>The user needs to guarantee that there is no discontinuity in the function with" +
      " the numbers that are going to be entered</h3>" +
      "<h4>Steps</h4>" +
      "<ol>"+
      "<li>Ask the user for a function</li>"+
      "<li>Ask the user to input an initial value to find the root of the function that is the " +
      "closest to this given value. This variable we will call A.</li>" +
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
  const [initialValue, setInitialValue] = useState(-10);
  const [delta, setDelta] = useState(0.1);
  const [result, setResult] = useState(incrementalSearch("x^2 - 1", 0, 0.1, 100));
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
    setInitialValue(event.target.initialValue.value);
    setDelta(event.target.delta.value);
    setResult(incrementalSearch(event.target.functionText.value, event.target.initialValue.value, event.target.delta.value, event.target.maxCount.value));
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
