import React, { useEffect, useRef, useState } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import * as d3 from "d3";
import {BorderRadius, Colors, Spacing, Typography} from "../rules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
window.d3 = d3;
const functionPlot = require("function-plot");

const Home = () => {
  const node = useRef(null);
  const [functionText, setFunctionText] = useState("x^2");
  useEffect(() => {
    if (node.current) {
      functionPlot({
        target: node.current,
        data: [
          {
            fn: functionText,
          },
        ],
      });
    }
  }, [node, functionText]);
  return (
    <React.Fragment>
      <Title>Peanut</Title>
      <Subtitle>
        Peanut is a website where you'll find several methods used to solve
        numerical analysis problems.{" "}
        <p>
          <Link to={"/about"}>
            <FontAwesomeIcon icon={["fas", "dot-circle"]} />
            Learn more about this website
          </Link>
        </p>
      </Subtitle>
      <MainContainer>
        <Graph ref={node} />
        <Parameters>
          <form>
          <input
            type="text"
            name="functionText"
            placeholder="x^2"
            value={functionText}
            onChange={e => setFunctionText(e.target.value)}
          />
          <button>Apply</button>
          </form>
        </Parameters>
      </MainContainer>
    </React.Fragment>
  );
};

const Title = styled("div")`
  font-size: ${Typography.largeTitle.fontSize};
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
`;

const Subtitle = styled("div")`
  font-size: ${Typography.subTitle.fontSize};
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
  svg {
    margin-right: ${Spacing.sm};
  }
`;

const MainContainer = styled("div")`
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Graph = styled("div")``;

const Parameters = styled("div")`
  display: flex;
  flex-direction: column;
  input {
    width: 360px;
    background: #fff;
    color: ${Colors.utility.black.default};
    font: inherit;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0 , .1);
    border: 0;
    outline: 0;
    padding: 22px 18px;
  }
  button {
      display: inline-block;
      color: inherit;
      font: inherit;
      border: 0;
      outline: 0;
      padding: 0;
      transition: all 200ms ease-in;
      cursor: pointer;
      background: ${Colors.primary.ocean.default};
      color: white;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
      border-radius: 2px;
      padding: 12px 36px;
      
      &:hover {
        background: darkblue;
      }
      
      &:active {
        box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2);
      }
      margin-left: -85px;
    }
  }
`;

export default Home;
