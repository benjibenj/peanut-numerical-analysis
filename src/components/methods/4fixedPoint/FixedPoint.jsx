import React, { useState } from "react";
import Method from "../Method";
import {
  RowContainer,
  Parameters,
  Eval,
  TableStyle,
  Button,
  Error, LinkIcon,
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
      prev={methods.find(method => method.index === 3)}
      next={methods.find(method => method.index === 5)}
    >
      <LinkIcon to={"/graph?function=" + encodeURIComponent(functionTextF)}>
        Graph f(x) = {functionTextF}
      </LinkIcon>
      {" or "}
      <LinkIcon to={"/graph?function=" + encodeURIComponent(functionTextG)}>
        Graph g(x) = {functionTextG}
      </LinkIcon>
      <RowContainer>
        <Parameters>
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
          <strong>{name}</strong>
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
            <React.Fragment>
              <Error>{error}</Error>
              <Link to={"help"}>
                <FontAwesomeIcon icon={"question-circle"} /> Help Page
              </Link>
            </React.Fragment>
          )}
        </Eval>
      </RowContainer>
    </Method>
  );
};

export default FixedPoint;
