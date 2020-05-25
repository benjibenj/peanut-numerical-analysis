import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { Title, Subtitle } from "../containers/BigContainer";
import { BorderRadius, Colors, Spacing, Typography } from "../rules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {methods} from "../data/methods";

const MethodsDashboard = () => {
  return (
    <MethodsContainer>
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
    </MethodsContainer>
  );
};

const MethodsContainer = styled("div")``;

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
  grid-template-columns: 250px 250px 250px 250px;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  @media (max-width: 1200px) {
    grid-template-columns: 250px 250px 250px;
  }
  @media (max-width: 900px) {
    grid-template-columns: 250px 250px;
  }
  @media (max-width: 660px) {
    grid-template-columns: 250px;
  }
  justify-items: left;
  align-items: flex-start;
`;

const MainContainer = styled("div")`
  margin: ${Spacing.lg} ${Spacing.xxl};
  @media (max-width: 440px) {
    margin: ${Spacing.xl};
  }
  @media (max-width: 340px) {
    margin: ${Spacing.lg};
  }
`;

const ModuleLink = styled(Link)`
  width: 200px;
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
