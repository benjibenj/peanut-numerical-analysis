import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Title, Subtitle } from "../containers/BigContainer";
import {BorderRadius, Colors, Spacing} from "../rules";

const Dashboard = () => {
  const modules = [
    { id: "function-evaluator", name: "Function evaluator" },
    { id: "incremental-search", name: "Incremental search" }
  ];
  return (
    <React.Fragment>
      <Title>Modules</Title>
      <Subtitle>30 methods to solve numerical problems</Subtitle>
      <MainContainer>
        {modules.map(module => {
          return (
            <ModuleLink key={module.id} to={module.id}>
              {module.name}
            </ModuleLink>
            )
        })}
      </MainContainer>
    </React.Fragment>
  );
};

const MainContainer = styled("div")`
  margin: ${Spacing.xxl};
  display: grid;
  grid-template-columns: 234px 234px 234px 234px;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  @media (max-width: 1080px) {
    grid-template-columns: 234px 234px;
  }
  @media (max-width: 550px) {
    grid-template-columns: 234px;
  }
  justify-items: left;
  align-items: center;
`;

const ModuleLink = styled(Link)`
  padding: ${Spacing.md} ${Spacing.lg};
  border: 2px solid ${Colors.primary.ocean.lighter};
  border-radius: ${BorderRadius.sm};
`;

export default Dashboard;
