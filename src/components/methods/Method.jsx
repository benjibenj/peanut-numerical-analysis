import React, { useState } from "react";

import { BorderRadius, Spacing } from "../../rules";
import { Subtitle, Title } from "../../containers/BigContainer";

import styled from "styled-components";

const Method = ({
  title = "Title to be defined",
  subTitle = "Description to be defined",
  children,
}) => {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Subtitle>{subTitle}</Subtitle>
      <MainContainer>
        <Side grow>
          <SideTitle>
            {"Method demo"}
          </SideTitle>
            <FuncEvalLive>{children}</FuncEvalLive>
        </Side>
      </MainContainer>
    </React.Fragment>
  );
};

const MainContainer = styled("div")`
  display: flex;
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
  flex-direction: row;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
  align-items: left;
`;

const SideTitle = styled("h2")``;

const Side = styled("div")`
  margin-right: ${Spacing.xl};
  flex-grow: ${props => props.grow && "1"};
`;

const FuncEvalLive = styled("div")`
  background-color: white;
  border-radius: ${BorderRadius.md};
  flex-grow: 1;
  width: 100%;
  padding: ${Spacing.md} ${Spacing.lg};
`;

export default Method;
