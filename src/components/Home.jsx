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
      <CenteredTitle>Peanut<h3>🥜</h3></CenteredTitle>
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
        <h3>Provide a function for the graph : </h3>
          <Graph />
      </MainContainer>
    </React.Fragment>
  );
};

const CenteredTitle = styled(Title)`
  text-align: center;
  margin: ${Spacing.lg} 0;
`;

const CenteredSubTitle = styled(Subtitle)`
  text-align: center;
  max-width: none;
`;

const MainContainer = styled("div")`
  margin: ${Spacing.lg} auto ${Spacing.xxl} auto;
  display: flex;
  justify-content: center;
  max-width: 700px;
  flex-direction: column;
  text-align: center;
`;

export default Home;
