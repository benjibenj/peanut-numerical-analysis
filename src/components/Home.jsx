import React from "react";

import {Shadows, Colors, Spacing, Typography, BorderRadius} from "../rules";

import squirrel_peanut from "../../src/img/squirrel_peanut.jpg";

import { Link } from "@reach/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Graph from "./Graph";

const Home = () => {
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
          <Graph />
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
  position: relative;
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
  background: linear-gradient(rgba(53, 129, 128, 0.4), rgba(53, 129, 128, 0.9)), url(${squirrel_peanut});
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

export default Home;
