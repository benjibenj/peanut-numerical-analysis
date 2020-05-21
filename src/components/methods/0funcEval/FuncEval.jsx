import React, { useEffect, useState } from "react";
import Method from "../Method";
import styled from "styled-components";
import {
  RowContainer,
  Parameters,
  Eval,
  Error,
  Button,
} from "../../../containers/BigContainer";

import FuncEvalDescription from "./funcEvalDescription";

import * as math from "mathjs";
import { parse } from "mathjs";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { methods } from "../../../data/methods";
import { BorderRadius, Colors, Spacing } from "../../../rules";

const FuncEval = ({ name }) => {
  const [functionText, setFunctionText] = useState("x^2");
  const [x, setX] = useState(2);
  const [resultEval, setResultEval] = useState(math.evaluate("x^2", { x: 2 }));
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      setError(null);
      parse(functionText);
    } catch (e) {
      if (e instanceof TypeError) {
        setError("The function you entered cannot be parsed");
      } else {
        setError(e.toString());
      }
    }
  }, [functionText]);
  const handleSubmit = event => {
    event.preventDefault();
    try {
      parse(event.target.functionText.value);
      setFunctionText(event.target.functionText.value);
      setX(event.target.x.value);
      setResultEval(
        math.evaluate(event.target.functionText.value, {
          x: event.target.x.value,
        }),
      );
      setError(null);
    } catch (e) {
      if (e instanceof TypeError) {
        setError("The function you entered cannot be parsed");
      } else {
        setError(e.toString());
      }
      setResultEval(null); // re-render empty results while processing
    }
  };
  return (
    <Method
      title={name}
      next={methods.find(method => method.index === 1)}
      description={<FuncEvalDescription />}
    >
      <LinkGraph>
        <Link to={"/graph?function=" + encodeURIComponent(functionText)}>
          Graph {functionText}
        </Link>
      </LinkGraph>
      <RowContainer>
        <Parameters>
          <form onSubmit={handleSubmit}>
            <label>
              Function
              <input
                type="text"
                name="functionText"
                defaultValue={functionText}
                onChange={(e) => setFunctionText(e.target.value)}
              />
            </label>
            <label>
              Value of x (can be an array)
              <input type="text" name="x" defaultValue={x} />
            </label>
            <Button>Apply</Button>
          </form>
        </Parameters>
        <Eval>
          <strong>{name}</strong>
          {!error ? (
            <ul>{"f(" + x + ") = " + resultEval.toString()}</ul>
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

const LinkGraph = styled("div")`
  margin: ${Spacing.xs} 0;
  padding: ${Spacing.xs} ${Spacing.md};
  border-radius: ${BorderRadius.md};
  background-color: ${Colors.primary.tan.default};
  text-align: center;
  display: inline-block;
  a {
    color: ${Colors.utility.white.default} !important;
    text-decoration: none;
    font-weight: bold;
  }
`;

export default FuncEval;
