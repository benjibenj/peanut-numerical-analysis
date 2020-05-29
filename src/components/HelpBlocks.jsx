import React, { useState } from "react";
import styled from "styled-components";
import { Colors, Shadows, Spacing } from "../rules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HelpBlocks = () => {
  const [q1Active, setQ1Active] = useState(false);
  const [q2Active, setQ2Active] = useState(false);
  const [q3Active, setQ3Active] = useState(false);
  const [q4Active, setQ4Active] = useState(false);
  const [q5Active, setQ5Active] = useState(false);
  const [q6Active, setQ6Active] = useState(false);
  return (
    <HelpContainer>
      <h2>FAQ</h2>
      <Question onClick={() => setQ1Active(!q1Active)} active={q1Active}>
        The function I provided cannot be parsed{" "}
        <FontAwesomeIcon
          icon={q1Active ? "arrow-alt-circle-up" : "arrow-alt-circle-down"}
        />
      </Question>
      {q1Active && (
        <React.Fragment>
          <p>
            The string provided by the user is <em>parsed</em> and{" "}
            <em>evaluated</em> using <a href={"https://mathjs.org/"}>mathjs</a>.
            You must make sure that the expression you provided respects the
            syntax of the expression parser from math.js.
          </p>
          <p>
            <a
              href={"https://mathjs.org/docs/expressions/syntax.html#operators"}
            >
              This page
            </a>{" "}
            describes how to work with the available operators, and more.
          </p>
        </React.Fragment>
      )}
      <Question onClick={() => setQ2Active(!q2Active)} active={q2Active}>
        I found a bug / an issue on the website{" "}
        <FontAwesomeIcon
          icon={q2Active ? "arrow-alt-circle-up" : "arrow-alt-circle-down"}
        />
      </Question>
      {q2Active && (
        <p>
          If you have identified an error or a bug that is worth reporting,
          please{" "}
          <a
            href={
              "https://github.com/benjamin-vaysse/peanut-numerical-analysis/issues/new"
            }
          >
            create an issue
          </a>{" "}
          on the{" "}
          <a
            href={
              "https://github.com/benjamin-vaysse/peanut-numerical-analysis/"
            }
          >
            GitHub project
          </a>
        </p>
      )}
      <Question onClick={() => setQ3Active(!q3Active)} active={q3Active}>
        I have trouble using the website on mobile{" "}
        <FontAwesomeIcon
          icon={q3Active ? "arrow-alt-circle-up" : "arrow-alt-circle-down"}
        />
      </Question>
      {q3Active && (
        <React.Fragment>
          <p>
            We're actively trying to make the website more mobile friendly, but
            we still struggle with some UI elements (especially LaTeX rendered
            elements).
          </p>
          <p>
            You're welcome to{" "}
            <a
              href={
                "https://github.com/benjamin-vaysse/peanut-numerical-analysis/issues/new"
              }
            >
              create an issue
            </a>{" "}
            or{" "}
            <a
              href={
                "https://github.com/benjamin-vaysse/peanut-numerical-analysis/"
              }
            >
              contribute
            </a>{" "}
            to help us make this project available to a wide variety of screens.
          </p>
        </React.Fragment>
      )}
      <p>
        For any other question, feel free to{" "}
        <a href={"mailto:benjamin.vaysse@gmail.com"}>contact us</a>.
      </p>
    </HelpContainer>
  );
};

const HelpContainer = styled("div")`
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
`;

const Question = styled("h4")`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  svg {
    margin-left: ${Spacing.md};
    color: ${props =>
      props.active ? Colors.primary.tan.default : Colors.primary.tan.lighter};
  }
  padding: 0 0 ${Spacing.sm} 0;
  border-bottom: 1px solid rgba(24, 24, 24, 0.3);
`;

export default HelpBlocks;
