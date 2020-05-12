import React, { useEffect, useState } from "react";
import Method from "../Method";
import SetOfPointsInput from "../../SetOfPointsInput";
import { Button, Error } from "../../../containers/BigContainer";
import styled from "styled-components";

import Latex from 'react-latex';

import renderLatexTable from "../../../utils/LaTeX/renderLatexTable";
import "katex/dist/katex.min.css";
import { methods } from "../../../data/methods";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Lagrange = ({ name }) => {
  const [points, setPoints] = useState({
    x: [-2, -1, 0, 1, 2],
    y: [23, 13, 5, -1, -5],
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
  const [latexPolynom, setLatexPolynom] = useState(
    "\\begin{pmatrix}\n a\\\\\n b\n \\end{pmatrix}",
  );
  const [error, setError] = useState(null);
  const [results, setResults] = useState(undefined);
  useEffect(() => {
    setLatexTable(renderLatexTable(points));
  }, [points]);
  return (
    <Method
      title={name}
      prev={methods.find(method => method.index === 20)}
    >
      {methodState.points === "input" ? (
        <SetOfPointsInput
          points={points}
          setPoints={points => setPoints(points)}
          setMethodState={state => setMethodState(state)}
        />
      ) : (
        <Column>
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
        </Column>
      )}
      {results && (
        <Results>
          {!error ? (
            <p>No error</p>
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
const Column = styled("div")`
  display: flex;
  flex-direction: column;
`;

const Results = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Lagrange;
