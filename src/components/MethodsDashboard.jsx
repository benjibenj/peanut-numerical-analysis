import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Title, Subtitle } from "../containers/BigContainer";
import { BorderRadius, Colors, Spacing, Typography } from "../rules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {methods} from "../data/methods";

const MethodsDashboard = () => {
  return (
    <React.Fragment>
      <Title>Methods</Title>
      <Subtitle>30 methods to solve numerical problems</Subtitle>
      <MainContainer>
        <ThemeTitle>
          <FontAwesomeIcon icon={"otter"} />
          Solving equations of one variable
        </ThemeTitle>
        <Theme>
          {methods
            .filter(module => {
              return module.theme === "one-var";
            })
            .map(module => {
              return (
                <ModuleLink key={module.id} to={module.id}>
                  {module.name}
                </ModuleLink>
              );
            })}
        </Theme>
        <ThemeTitle>
          <FontAwesomeIcon icon={"horse-head"} />
          Solution of systems of equations
        </ThemeTitle>
        <Theme>
          {methods
            .filter(module => {
              return module.theme === "sys-eq";
            })
            .map(module => {
              return (
                <ModuleLink key={module.id} to={module.id}>
                  {module.name}
                </ModuleLink>
              );
            })}
        </Theme>
        <ThemeTitle>
          <FontAwesomeIcon icon={"kiwi-bird"} />
          Interpolation
        </ThemeTitle>
        <Theme>
          {methods
            .filter(module => {
              return module.theme === "interpolation";
            })
            .map(module => {
              return (
                <ModuleLink key={module.id} to={module.id}>
                  {module.name}
                </ModuleLink>
              );
            })}
        </Theme>
      </MainContainer>
    </React.Fragment>
  );
};

const ThemeTitle = styled("div")`
  margin-bottom: ${Spacing.lg};
  font-size: ${Typography.subTitle};
  font-weight: 600;
  svg {
    padding: 0 ${Spacing.md} 0 0;
  }
`;

const Theme = styled("div")`
  margin-bottom: ${Spacing.lg};
  display: grid;
  grid-template-columns: 300px 300px 300px 300px;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  @media (max-width: 1370px) {
    grid-template-columns: 300px 300px 300px;
  }
  @media (max-width: 1080px) {
    grid-template-columns: 300px 300px;
  }
  @media (max-width: 730px) {
    grid-template-columns: 300px;
  }
  justify-items: left;
  align-items: flex-start;
`;

const MainContainer = styled("div")`
  margin: ${Spacing.lg} ${Spacing.xxl};
`;

const ModuleLink = styled(Link)`
  width: 250px;
  padding: ${Spacing.md} ${Spacing.lg};
  border: 2px solid ${Colors.primary.ocean.lighter};
  border-radius: ${BorderRadius.sm};
  &:hover {
    background-color: ${Colors.primary.ocean.darker};
    color: ${Colors.utility.white.default};
    transform: translateY(-3px);
  }
  text-decoration: none;
`;

export default MethodsDashboard;
