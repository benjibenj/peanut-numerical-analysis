import React, { useState } from "react";
import { parse } from "mathjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@reach/router";

import Method from "../Method";
import {
  MediaContainer,
  Parameters,
  Eval,
  Error,
  Button,
  LinkGraph,
} from "../../../containers/BigContainer";
import incSearchFunction from "./incSearchFunction";
import { methods } from "../../../data/methods";

const IncSearch = ({ name }) => {
  const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1) - (1/2)");
  const [initialValue, setInitialValue] = useState(-3);
  const [delta, setDelta] = useState(0.5);
  const [results, setResults] = useState(
    incSearchFunction("log(sin(x)^2 + 1) - (1/2)", -3, 0.5, 100),
  );
  const [error, setError] = useState(null);
  const handleSubmit = event => {
    event.preventDefault();
    try {
      parse(event.target.functionText.value);
      setResults([]); // re-render empty results while processing
      setFunctionText(event.target.functionText.value);
      setInitialValue(event.target.initialValue.value);
      setDelta(event.target.delta.value);
      setError(null);
      setResults(
        incSearchFunction(
          event.target.functionText.value,
          parseFloat(event.target.initialValue.value),
          parseFloat(event.target.delta.value),
          parseInt(event.target.maxCount.value),
        ),
      );
    } catch (e) {
      if (e instanceof TypeError) {
        setError("The function you entered cannot be parsed");
      } else {
        setError(e + "");
      }
      setResults([]); // re-render empty results while processing
    }
  };
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 0)}
      next={methods.find(method => method.index === 2)}
    >
      <LinkGraph>
        <Link to={"/graph?function=" + encodeURIComponent(functionText)}>
          Graph {functionText}
        </Link>
      </LinkGraph>
      <MediaContainer width={"950px"}>
        <Parameters width={"950px"}>
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
              />
            </label>
            <label>
              Initial value
              <input
                type="text"
                name="initialValue"
                defaultValue={initialValue}
              />
            </label>
            <label>
              Delta
              <input type="text" name="delta" defaultValue={delta} />
            </label>
            <label>
              Max iterations (max 100)
              <input type="text" name="maxCount" defaultValue={100} />
            </label>
            <Button>Run</Button>
          </form>
        </Parameters>
        <Eval>
          <p>
            <strong>{name}</strong>
          </p>
          {!error ? (
            <ul>
              {results.map((result, index) => {
                return <li key={index}>{result}</li>;
              })}
            </ul>
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
    </Method>
  );
};

export default IncSearch;
