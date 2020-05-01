import React, {useState} from "react";
import Method from "./Method";
import {RowContainer, Parameters, Eval, Error} from "../../containers/BigContainer";

import * as math from "mathjs";
import {parse} from "mathjs";
import {Link} from "@reach/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const FuncEval = () => {
  const title = "Function Evaluator";
  const subTitle = "This method simply evaluates each value passed (x) with the function selected (f(x)).";
  const [functionText, setFunctionText] = useState("x^2");
  const [x, setX] = useState(2);
  const [resultEval, setResultEval] = useState(math.evaluate("x^2", {x: 2}));
  const [error, setError] = useState(null);
  const handleSubmit = event => {
    event.preventDefault();
    try {
      parse(event.target.functionText.value);
      setFunctionText(event.target.functionText.value);
      setX(event.target.x.value);
      setResultEval(math.evaluate(event.target.functionText.value, {x: event.target.x.value}));
      setError(null);
    }
    catch (e) {
      if (e instanceof TypeError) {
        setError("The function you entered cannot be parsed");
      } else {
        setError(e.toString());
      }
      setResultEval(null); // re-render empty results while processing
    }
  };
  return (
    <Method
      title={title}
      subTitle={subTitle}
      >
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>Function<input type="text" name="functionText" defaultValue={functionText} /></label>
            <label>Value of x (can be an array)<input type="text" name="x" defaultValue={x} /></label>
            <button>Apply</button>
          </form>
        </Parameters>
        <Eval>
          <strong>{title}</strong>
          {!error ? (
            <ul>
              {"f(" + x +  ") = " + resultEval.toString()}
            </ul>
          ) : (
            <React.Fragment>
              <Error>{error}</Error>
              <Link to={"help"}><FontAwesomeIcon icon={"question-circle"}/>   Help Page</Link>
            </React.Fragment>
          )}
        </Eval>
      </RowContainer>
    </Method>
  );
};

export default FuncEval;
