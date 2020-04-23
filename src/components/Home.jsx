import React from "react";

import {Spacing} from "../rules";
import {Title, Subtitle} from "../containers/BigContainer";

import { Link } from "@reach/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Graph from "./Graph";

const Home = () => {
  return (
    <React.Fragment>
      <CenteredTitle>Peanut</CenteredTitle>
      <CenteredSubTitle>
        Peanut is a website where you'll find several methods used to solve
        numerical analysis problems.{" "}
        <p>
          <Link to={"/about"}>
            <FontAwesomeIcon icon={["fas", "dot-circle"]} />
            Learn more about this website
          </Link>
        </p>
      </CenteredSubTitle>
      <MainContainer>
        <LeftContainer>
          <Graph />
        </LeftContainer>
      </MainContainer>
    </React.Fragment>
  );
};

const CenteredTitle = styled(Title)`
  text-align: center;
`;

const CenteredSubTitle = styled(Subtitle)`
  text-align: center;
  max-width: none;
`;

const MainContainer = styled("div")`
  margin: ${Spacing.xxl} ${Spacing.xl};
  display: flex;
  flex-direction: row;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
  justify-content: center;
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

export default Home;
