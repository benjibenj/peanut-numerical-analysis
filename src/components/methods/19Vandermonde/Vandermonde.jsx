import React, { useEffect, useState } from "react";
import Method from "../Method";
import SetOfPointsInput from "../../SetOfPointsInput";
import { Button, Error, Results} from "../../../containers/BigContainer";
import styled from "styled-components";

import Latex from "react-latex";
import vandermondeFunction from "./vandermondeFunction";
import renderLatexTable from "../../../utils/LaTeX/renderLatexTable";
import "katex/dist/katex.min.css";
import { methods } from "../../../data/methods";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlockMath } from "react-katex";
import renderLatexMatrix from "../../../utils/LaTeX/renderLatexMatrix";
import renderLatexPolynom from "../../../utils/LaTeX/renderLatexPolynom";

const Vandermonde = ({ name }) => {
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
      ? setResults(vandermondeFunction(points))
      : setResults(undefined);
  }, [points, methodState]);
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 16)}
      next={methods.find(method => method.index === 20)}
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
      {results && (
        <Results>
          {!error ? (
            <React.Fragment>
              <p>Vandermonde matrix</p>
              <BlockMath
                math={
                  renderLatexMatrix(results.matrixA) +
                  renderLatexMatrix(results.ai) +
                  " = " +
                  renderLatexMatrix(results.B)
                }
              />
              <p>Polynomial coefficients :</p>
              <p>[{results.polynom.join(", ")}]</p>
              <p>Vandermonde polynom</p>
              <BlockMath math={renderLatexPolynom(results.polynom)} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Error>{error}</Error>
              <Link to={"help"}>
                <FontAwesomeIcon icon={"question-circle"} /> Help Page
              </Link>
            </React.Fragment>
          )}
          <p>{results.conclusion && results.conclusion}</p>
        </Results>
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

export default Vandermonde;
