import React, { useEffect, useState } from "react";
import Method from "../Method";
import SetOfPointsInput from "../../SetOfPointsInput";
import {
  Button,
  Error,
  TableStyle,
  Results,
  Parameters,
} from "../../../containers/BigContainer";
import styled from "styled-components";

import Latex from "react-latex";

import renderLatexTable from "../../../utils/LaTeX/renderLatexTable";
import "katex/dist/katex.min.css";
import { methods } from "../../../data/methods";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InlineMath } from "react-katex";
import splinesLinearFunction from "./splinesLinearFunction";
import splinesCuadFunction from "./splinesCuadFunction";
import splinesCubicFunction from "./splinesCubicFunction";

const Splines = ({ name }) => {
  const [points, setPoints] = useState({
    x: [-2, -1, 2, 3],
    y: [12.1353, 6.3678, -4.6109, 2.08553],
  });
  const [methodState, setMethodState] = useState({
    points: "input",
  });
  const [latexTable, setLatexTable] = useState(
    "\\begin{array}{ |c|c|c|c|c|c|}  \n" +
      " \\hline\n" +
      "x & -2 & -1 & 0 & 1 & 2\\\\ \n" +
      " \\hline\n" +
      "y & 23 & 13 & 5 & -1 & -5\\\\ \n" +
      " \\hline\n" +
      "\\end{array}",
  );
  const [error, setError] = useState(null);
  const [results, setResults] = useState(undefined);
  const [method, setMethod] = useState(1);
  useEffect(() => {
    setError(null);
    setLatexTable(renderLatexTable(points));
    if (methodState.points !== "input") {
      try {
        if (method === 1) {
          setResults(splinesLinearFunction(points));
        } else if (method === 2) {
          setResults(splinesCuadFunction(points));
        } else if (method === 3) {
          setResults(splinesCubicFunction(points));
        }
      } catch (e) {
        setError(e + "");
        setResults(undefined);
      }
    } else {
      setResults(undefined);
    }
  }, [points, methodState, method]);
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 21)}
      jsAlgorithm={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/22Splines/splinesFunction.js"
      }
      pseudoCode={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/22Splines/pseudoCode/splines.pdf"
      }
    >
      {methodState.points === "input" ? (
        <CenteredColumn>
          <Parameters>
            <select
              name="method"
              value={method}
              onChange={event => setMethod(parseInt(event.target.value))}
            >
              <option value={1}>Linear</option>
              <option value={2}>Square</option>
              <option value={3}>Cubic</option>
            </select>
          </Parameters>
          <SetOfPointsInput
            points={points}
            setPoints={points => setPoints(points)}
            setMethodState={state => setMethodState(state)}
          />
        </CenteredColumn>
      ) : (
        <CenteredColumn>
          <Latex displayMode={true}>{`$$` + latexTable + `$$`}</Latex>
          <Button
            onClick={() => {
              setMethodState(prevState => ({
                ...prevState,
                points: "input",
              }));
            }}
          >
            Change the points
          </Button>
        </CenteredColumn>
      )}
      {results ? (
        <Results>
          <h2>
            Spline {method === 1 ? "Linear" : method === 2 ? "Square" : "Cubic"}
          </h2>
          {!error ? (
            <React.Fragment>
              {results.tracerCoefficient.length !== 0 && (
                <TableStyle>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <InlineMath>i</InlineMath>
                        </th>
                        <th>
                          <InlineMath>Tracer Coefficient</InlineMath>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.tracerCoefficient.map((Lx, index) => {
                        return (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>
                              <InlineMath>{Lx}</InlineMath>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </TableStyle>
              )}
              <br />
              {results.interpolationPolynomials.length !== 0 && (
                <TableStyle>
                  <table>
                    <thead>
                    <tr>
                      <th>
                        <InlineMath>i</InlineMath>
                      </th>
                      <th>
                        <InlineMath>Tracers</InlineMath>
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.interpolationPolynomials.map((Lx, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>
                            <InlineMath>{Lx}</InlineMath>
                          </td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </TableStyle>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Error>{error}</Error>
              <Link to={"/help"}>
                <FontAwesomeIcon icon={"question-circle"} /> Help Page
              </Link>
            </React.Fragment>
          )}
        </Results>
      ) : (
        methodState.points !== "input" && (
          <Results>
            <h3>This might take a while</h3>
          </Results>
        )
      )}
    </Method>
  );
};
const CenteredColumn = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Splines;
