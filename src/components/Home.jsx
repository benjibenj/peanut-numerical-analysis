import React, { useEffect, useRef, useState } from "react";

import useWindowDimensions from "../utils/windowDimensionsHook";
import {Shadows, Colors, Spacing, Typography, BorderRadius} from "../rules";

import spitting_lama from "../../src/img/spitting-lama.jpg";

import { Link } from "@reach/router";
import styled from "styled-components";
import * as d3 from "d3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
window.d3 = d3;
const functionPlot = require("function-plot");



const Home = () => {
  const { height, width } = useWindowDimensions();
  const node = useRef(null);
  const [functionText, setFunctionText] = useState("x^2");
  useEffect(() => {
    if (node.current) {
      functionPlot({
        target: node.current,
        width: width > 800 ? 700 : width - 80,
        height: 480,
        data: [
          {
            fn: functionText,
          },
        ],
      });
    }
  }, [node, functionText, width]);
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
        <LeftContainer>
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
        </LeftContainer>
        <RightContainer>
          <Link to={"/modules"}>
            <ImageLink>
              Browse methods
            </ImageLink>
          </Link>
        </RightContainer>
      </MainContainer>
    </React.Fragment>
  );
};

const Title = styled("div")`
  font-size: ${Typography.largeTitle.fontSize};
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
`;

const Subtitle = styled("div")`
  max-width: 700px;
  font-size: ${Typography.subTitle.fontSize};
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
  svg {
    margin-right: ${Spacing.sm};
  }
`;

const MainContainer = styled("div")`
  margin: ${Spacing.xxl} ${Spacing.xl};
  display: flex;
  flex-direction: row;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
  align-items: left;
`;

const LeftContainer = styled("div")`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: left;
  @media (max-width: 1200px) {
    margin: 0 0 ${Spacing.lg} 0;
  }
`;

const RightContainer = styled("div")`-
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  margin: 0 ${Spacing.xxl};
  @media (max-width: 1200px) {
    margin: ${Spacing.md} 0;
  }
  a {
    text-decoration: none;
    font-weight: 600;
  }
  
  &:hover {   
   a {
      text-decoration: underline;
      color: white;
   }
  }
`;

const ImageLink = styled("div")`
  width: 100%;
  height: 520px;
  text-align: center;
  &:hover {
   transform: translateY(-2px);
  } 
  box-shadow: ${Shadows.level2};
  background: linear-gradient(rgba(53, 129, 128, 0.4), rgba(53, 129, 128, 0.9)), url(${spitting_lama});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: ${BorderRadius.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${Colors.utility.white.default};
  @media screen and (max-width: 900px) {
    height: 400px;
  }
  font-size: ${Typography.largeTitle.fontSize};
  text-transform: uppercase;
`;

const Graph = styled("div")`
  margin: 0 0 ${Spacing.md} 0;
`;

const Parameters = styled("div")`
  display: flex;
  flex-direction: column;
  align-self: center;
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
        background: ${Colors.primary.ocean.darker};
      }
      
      &:active {
        box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2);
      }
      margin-left: -85px;
    }
  }
`;

export default Home;
