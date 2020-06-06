import React, { useEffect, useState } from "react";
import Method from "../Method";
import SetOfPointsInput from "../../SetOfPointsInput";
import {
  Button,
  Error,
  TableStyle,
  Results,
  LinkGraph,
  Question,
} from "../../../containers/BigContainer";
import styled from "styled-components";

import Latex from "react-latex";

import renderLatexTable from "../../../utils/LaTeX/renderLatexTable";
import "katex/dist/katex.min.css";
import { methods } from "../../../data/methods";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InlineMath } from "react-katex";
import lagrangeFunction from "./lagrangeFunction";

const Lagrange = ({ name }) => {
  const [points, setPoints] = useState({
    x: [-1, 0, 3, 4],
    y: [15.5, 3, 8, 1],
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
  const [displayHelp, setDisplayHelp] = useState(false);
  useEffect(() => {
    setError(null);
    setLatexTable(renderLatexTable(points));
    if (methodState.points !== "input") {
      try {
        setResults(lagrangeFunction(points));
      } catch (e) {
        setError(e + "");
        setResults(undefined);
      }
    } else {
      setResults(undefined);
    }
  }, [points, methodState]);
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 20)}
      next={methods.find(method => method.index === 22)}
      jsAlgorithm={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/21Lagrange/lagrangeFunction.js"
      }
      pseudoCode={
        "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/src/components/methods/21Lagrange/pseudoCode/lagrange.pdf"
      }
    >
      {methodState.points === "input" ? (
        <CenteredColumn>
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
          {!error ? (
            <React.Fragment>
              <p>Lagrange interpolating polynomials</p>
              {results.interpolationPolynomials.length !== 0 && (
                <TableStyle>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <InlineMath>i</InlineMath>
                        </th>
                        <th>
                          <InlineMath>L_i(x)</InlineMath>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.interpolationPolynomials.map((Lx, index) => {
                        return (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{Lx}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </TableStyle>
              )}
              <p>Lagrange polynom</p>
              {results.polynom && (
                <React.Fragment>
                  <p>{results.polynom}</p>
                  <LinkGraph>
                    <a
                      href={
                        "/graph?function=" + encodeURIComponent(results.polynom)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Graph Lagrange's polynom
                    </a>
                  </LinkGraph>
                </React.Fragment>
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
            <Error>{error}</Error>
            <Link to={"/help"}>
              <FontAwesomeIcon icon={"question-circle"} /> Help Page
            </Link>
          </Results>
        )
      )}
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

const CenteredColumn = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Lagrange;
