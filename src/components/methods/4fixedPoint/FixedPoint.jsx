import React, { useState } from "react";
import Method from "../Method";
import {
  MediaContainer,
  Parameters,
  Eval,
  TableStyle,
  Button,
  Error,
  LinkGraph,
  Results,
  Question,
} from "../../../containers/BigContainer";
import fixedPointFunction from "./fixedPointFunction";
import { methods } from "../../../data/methods";
import { parse } from "mathjs";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FixedPoint = ({ name }) => {
  const [functionTextF, setFunctionTextF] = useState(
    "log(sin(x)^2 + 1)-(1/2)-x",
  );
  const [functionTextG, setFunctionTextG] = useState("log(sin(x)^2 + 1)-(1/2)");
  const [initialValue, setInitialValue] = useState(-0.5);
  const [tol, setTol] = useState(1e-7);
  const [displayHelp, setDisplayHelp] = useState(false);
  const [results, setResults] = useState(
    fixedPointFunction(
      "log(sin(x)^2 + 1)-(1/2)-x",
      "log(sin(x)^2 + 1)-(1/2)",
      -0.5,
      1e-7,
      100,
    ),
  );
  const [error, setError] = useState(null);
  const handleSubmit = event => {
    event.preventDefault();
    try {
      parse(event.target.functionTextF.value);
      parse(event.target.functionTextG.value);
      setFunctionTextF(event.target.functionTextF.value);
      setFunctionTextG(event.target.functionTextG.value);
      setInitialValue(event.target.initialValue.value);
      setTol(event.target.tol.value);
      setResults(
        fixedPointFunction(
          event.target.functionTextF.value,
          event.target.functionTextG.value,
          parseFloat(event.target.initialValue.value),
          parseFloat(event.target.tol.value),
          parseInt(event.target.maxCount.value),
        ),
      );
      setError(null);
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
      prev={methods.find(method => method.index === 3)}
      next={methods.find(method => method.index === 5)}
      jsAlgorithm={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/4fixedPoint/fixedPointFunction.js"
      }
      pseudoCode={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/4fixedPoint/pseudoCode/fixedPoint.pdf"
      }
    >
      <LinkGraph>
        <a
          href={"/graph?function=" + encodeURIComponent(functionTextF)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Graph f(x) = {functionTextF}
        </a>
      </LinkGraph>
      <LinkGraph>
        <a
          href={"/graph?function=" + encodeURIComponent(functionTextG)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Graph g(x) = {functionTextG}
        </a>
      </LinkGraph>
      <MediaContainer width={"1030px"}>
        <Parameters width={"1030px"}>
          <p>
            <strong>Parameters</strong>
          </p>
          <p>
            You need to make sure that f(X) is <strong>continuous</strong> and
            g(X) is <strong>smooth and continuous</strong> on the interval. To
            do so, you should plot{" "}
            <a
              href={"/graph?function=" + encodeURIComponent(functionTextF)}
              target="_blank"
              rel="noopener noreferrer"
            >
              f(x)
            </a>{" "}
            and{" "}
            <a
              href={"/graph?function=" + encodeURIComponent(functionTextG)}
              target="_blank"
              rel="noopener noreferrer"
            >
              g(x)
            </a>
            .
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Function f
              <input
                type="text"
                name="functionTextF"
                defaultValue={functionTextF}
              />
            </label>
            <label>
              Function g
              <input
                type="text"
                name="functionTextG"
                defaultValue={functionTextG}
              />
            </label>
            <label>
              Initial value (x0)
              <input
                type="text"
                name="initialValue"
                defaultValue={initialValue}
              />
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
            <TableStyle>
              <table>
                <thead>
                  <tr>
                    <th>Iteration (i)</th>
                    <th>xi</th>
                    <th>g(xi)</th>
                    <th>f(xi)</th>
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
          The functions must be continuous and differentiable.
          </p>
          <p>Be sure that the function have a root.</p>
          <p>The initial value is important for the method.</p>
          <p>Tolerance must have a positive value.</p>
          <p>The iteration number must be positive.</p>
        </React.Fragment>
      )}
    </Method>
  );
};

export default FixedPoint;
