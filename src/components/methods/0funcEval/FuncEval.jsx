import React, { useEffect, useState } from "react";
import Method from "../Method";
import {
  MediaContainer,
  Parameters,
  Eval,
  Error,
  Button,
  LinkGraph,
  Question,
} from "../../../containers/BigContainer";

import * as math from "mathjs";
import { parse } from "mathjs";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { methods } from "../../../data/methods";

const FuncEval = ({ name }) => {
  const [functionText, setFunctionText] = useState("x^2");
  const [x, setX] = useState(2);
  const [resultEval, setResultEval] = useState(math.evaluate("x^2", { x: 2 }));
  const [error, setError] = useState(null);
  const [displayHelp, setDisplayHelp] = useState(false);
  useEffect(() => {
    try {
      setError(null);
      parse(functionText);
    } catch (e) {
      setError(e.toString());
    }
  }, [functionText]);
  const handleSubmit = event => {
    event.preventDefault();
    try {
      parse(event.target.functionText.value);
      setFunctionText(event.target.functionText.value);
      setX(event.target.x.value);
      setResultEval(
        math.evaluate(event.target.functionText.value, {
          x: event.target.x.value,
        }),
      );
      setError(null);
    } catch (e) {
      setError(e.toString());
      setResultEval(null); // re-render empty results while processing
    }
  };
  return (
    <Method title={name} next={methods.find(method => method.index === 1)}>
      <LinkGraph>
        <a
          href={"/graph?function=" + encodeURIComponent(functionText)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Graph {functionText}
        </a>
      </LinkGraph>
      <MediaContainer width={"700px"}>
        <Parameters width={"700px"}>
          <p>
            <strong>Parameters</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Function
              <input
                type="text"
                name="functionText"
                defaultValue={functionText}
                onChange={e => setFunctionText(e.target.value)}
              />
            </label>
            <label>
              Value of x
              <input type="text" name="x" defaultValue={x} />
            </label>
            <Button>Apply</Button>
          </form>
        </Parameters>
        <Eval>
          <p>
            <strong>{name}</strong>
          </p>
          {!error && resultEval ? (
            <p>{"f(" + x + ") = " + resultEval.toString()}</p>
          ) : (
            <React.Fragment>
              <Error>{error}</Error>
              <Link to={"/help"}>
                <FontAwesomeIcon icon={"question-circle"} /> Help Page
              </Link>
            </React.Fragment>
          )}
        </Eval>
      </MediaContainer>
      <Question
        onClick={() => setDisplayHelp(!displayHelp)}
        active={displayHelp}
      >
        Help
        <FontAwesomeIcon
          icon={displayHelp ? "arrow-alt-circle-up" : "arrow-alt-circle-down"}
        />
      </Question>
      {displayHelp && (
        <React.Fragment>
          <p>
            The delta should not be too small because it can slow down the
            method.
          </p>
          <p>the initial value must exist in the function.</p>
          <p>The function must be continuous and differentiable.</p>
          <p>Tolerance must have a positive value.</p>
          <p>The maximum iteration number is 100.</p>
        </React.Fragment>
      )}
    </Method>
  );
};

export default FuncEval;
