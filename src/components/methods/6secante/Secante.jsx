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
} from "../../../containers/BigContainer";
import secanteFunction from "./secanteFunction";
import { methods } from "../../../data/methods";
import { parse } from "mathjs";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Secante = ({ name }) => {
  const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1)-(1/2)");
  const [initialValueX0, setInitialValueX0] = useState(0.5);
  const [initialValueX1, setInitialValueX1] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [results, setResults] = useState(
    secanteFunction("log(sin(x)^2 + 1)-(1/2)", 0.5, 1, 1e-7, 100),
  );
  const [error, setError] = useState(null);
  const handleSubmit = event => {
    event.preventDefault();
    try {
      parse(event.target.functionText.value);
      setFunctionText(event.target.functionText.value);
      setInitialValueX0(event.target.initialValueX0.value);
      setInitialValueX1(event.target.initialValueX1.value);
      setTol(event.target.tol.value);
      setResults(
        secanteFunction(
          event.target.functionText.value,
          parseFloat(event.target.initialValueX0.value),
          parseFloat(event.target.initialValueX1.value),
          parseFloat(event.target.tol.value),
          parseInt(event.target.maxCount.value),
        ),
      );
      setError(null);
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
      prev={methods.find(method => method.index === 5)}
      next={methods.find(method => method.index === 7)}
    >
      <LinkGraph>
        <Link to={"/graph?function=" + encodeURIComponent(functionText)}>
          Graph {functionText}
        </Link>
      </LinkGraph>
      <MediaContainer width={"900px"}>
        <Parameters width={"900px"}>
          <p>
            <strong>Parameters</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Function f
              <input
                type="text"
                name="functionText"
                defaultValue={functionText}
              />
            </label>
            <label>
              Initial value (x0)
              <input
                type="text"
                name="initialValueX0"
                defaultValue={initialValueX0}
              />
            </label>
            <label>
              Initial value (x1)
              <input
                type="text"
                name="initialValueX1"
                defaultValue={initialValueX1}
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
          <p><strong>{name}</strong></p>
          {!error ? (
            <TableStyle>
              <table>
                <thead>
                  <tr>
                    <th>Iteration (i)</th>
                    <th>xi</th>
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p>{results.conclusion}</p>
            </TableStyle>
          ) : (
            <React.Fragment>
              <Error>{error}</Error>
              <Link to={"help"}>
                <FontAwesomeIcon icon={"question-circle"} /> Help Page
              </Link>
            </React.Fragment>
          )}
        </Eval>
      </MediaContainer>
    </Method>
  );
};

export default Secante;
