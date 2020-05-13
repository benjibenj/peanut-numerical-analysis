import React, { useEffect, useState } from "react";
import Method from "../Method";
import SetOfPointsInput from "../../SetOfPointsInput";
import { Button, Error, TableStyle } from "../../../containers/BigContainer";
import styled from "styled-components";
import { format } from "mathjs";

import Latex from "react-latex";
import renderLatexTable from "../../../utils/LaTeX/renderLatexTable";
import "katex/dist/katex.min.css";
import { methods } from "../../../data/methods";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import newtonInterpolationFunction from "./newtonInterpolationFunction";
import { BlockMath, InlineMath } from "react-katex";

const NewtonInterpolation = ({ name }) => {
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
  useEffect(() => {
    setLatexTable(renderLatexTable(points));
    methodState.points !== "input"
      ? setResults(newtonInterpolationFunction(points))
      : setResults(undefined);
  }, [points, methodState]);
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 19)}
      next={methods.find(method => method.index === 21)}
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
              {results.polynom && (
                <BlockMath math={results.polynom.replace(/\\cdot/g, "")} />
              )}
              {results.dividedDifference && (
                <TableStyle>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <InlineMath>n</InlineMath>
                        </th>
                        <th>
                          <InlineMath>x_i</InlineMath>
                        </th>
                        {results.dividedDifference.map((row, index) => {
                          if (index === 0) {
                            return (
                              <th key={index}>
                                <InlineMath>y = f[x_i]</InlineMath>
                              </th>
                            );
                          } else {
                            return (
                              <th key={index}>
                                <InlineMath>{index + "ra"}</InlineMath>
                              </th>
                            );
                          }
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {results.dividedDifference.map((row, indexY) => {
                        return (
                          <React.Fragment key={indexY}>
                            <tr>
                              <td>{indexY}</td>
                              <td>{points.x[indexY]}</td>
                              {row.map((elem, indexX) => {
                                return indexY === 0 ? (
                                  <td key={indexX}>
                                    <strong>
                                      {format(elem, {
                                        notation: "fixed",
                                        precision: 4,
                                      })}
                                    </strong>
                                  </td>
                                ) : (
                                  <td key={indexX}>
                                    {format(elem, {
                                      notation: "fixed",
                                      precision: 6,
                                    })}
                                  </td>
                                );
                              })}
                            </tr>
                          </React.Fragment>
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
              <Link to={"help"}>
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

const Results = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default NewtonInterpolation;
