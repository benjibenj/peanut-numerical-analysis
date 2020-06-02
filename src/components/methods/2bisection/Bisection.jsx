import React, { useState } from "react";
import Method from "../Method";
import {
  Parameters,
  Eval,
  TableStyle,
  Button,
  Error,
  LinkGraph,
  MediaContainer,
  Results
} from "../../../containers/BigContainer";

import bisectionFunction from "./bisectionFunction";
import { methods } from "../../../data/methods";
import { parse } from "mathjs";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bisection = ({ name }) => {
  const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1)-(1/2)");
  const [lowValue, setLowValue] = useState(0);
  const [highValue, setHighValue] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [results, setResults] = useState(
    bisectionFunction("log(sin(x)^2 + 1)-(1/2)", 0, 1, 1e-7, 100),
  );
  const [error, setError] = useState(null);
  const handleSubmit = event => {
    event.preventDefault();
    try {
      parse(event.target.functionText.value);
      setFunctionText(event.target.functionText.value);
      setLowValue(event.target.lowValue.value);
      setHighValue(event.target.highValue.value);
      setTol(event.target.tol.value);
      setError(null);
      setResults(
        bisectionFunction(
          event.target.functionText.value,
          parseFloat(event.target.lowValue.value),
          parseFloat(event.target.highValue.value),
          parseFloat(event.target.tol.value),
          parseInt(event.target.maxCount.value),
        ),
      );
    } catch (e) {
      setError(e + "");
      setResults({
        iterations: [],
        conclusion: undefined,
      }); // re-render empty results while processing
    }
  };
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 1)}
      next={methods.find(method => method.index === 3)}
      jsAlgorithm={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/2bisection/bisectionFunction.js"
      }
      pseudoCode={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/2bisection/pseudoCode/bisection.pdf"
      }
    >
      <LinkGraph>
        <a href={"/graph?function=" + encodeURIComponent(functionText)} target="_blank" rel="noopener noreferrer">
          Graph {functionText}
        </a>
      </LinkGraph>
      <MediaContainer width={"1100px"}>
        <Parameters width={"1100px"}>
          <p>
            <strong>Parameters</strong>
          </p>
          <p>
            You need to make sure that the function in continuous for the given
            interval. To do so, you should{" "}
            <a href={"/graph?function=" + encodeURIComponent(functionText)} target="_blank" rel="noopener noreferrer">
              plot the function.
            </a>
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
              Lower interval value (a)
              <input type="text" name="lowValue" defaultValue={lowValue} />
            </label>
            <label>
              Higher interval value (b)
              <input type="text" name="highValue" defaultValue={highValue} />
            </label>
            <label>
              Tolerance
              <input type="text" name="tol" defaultValue={tol} />
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
            <TableStyle widthTwo={"584px"}>
              <table>
                <thead>
                  <tr>
                    <th>Iteration</th>
                    <th>a</th>
                    <th>xm</th>
                    <th>b</th>
                    <th>f(xm)</th>
                    <th>E</th>
                  </tr>
                </thead>
                <tbody>
                  {results.iterations.map((result, index) => {
                    return (
                      <tr key={index}>
                        <td>{result[0]}</td>
                        <td>{result[1]}</td>
                        <td>{result[2]}</td>
                        <td>{result[3]}</td>
                        <td>{result[4]}</td>
                        <td>{result[5]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p>{results.conclusion}</p>
            </TableStyle>
          ) : (
            <Results>
              <Error>{error}</Error>
              <Link to={"/help"}>
                <FontAwesomeIcon icon={"question-circle"} /> Help Page
              </Link>
            </Results>
          )}
        </Eval>
      </MediaContainer>
    </Method>
  );
};

export default Bisection;
