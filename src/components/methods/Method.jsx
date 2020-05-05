import React from "react";

import { BorderRadius, Spacing } from "../../rules";
import { Subtitle, Title } from "../../containers/BigContainer";

import { Link } from "@reach/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Method = ({
  title = "Title to be defined",
  prev,
  next,
  subTitle = "Method description to be defined",
  description,
  children,
}) => {
  return (
    <React.Fragment>
      <TitleLine>
        <Title>{title}</Title>
        <Links>
          {prev && (
            <LinkMethod to={"/methods/" + prev.id}>
              {" "}
              <FontAwesomeIcon icon={"arrow-left"} />
              {prev.name}
            </LinkMethod>
          )}
          {next && (
            <LinkMethod to={"/methods/" + next.id}>
              <FontAwesomeIcon icon={"arrow-right"} />
              {next.name}
            </LinkMethod>
          )}
        </Links>
      </TitleLine>
      <Subtitle>{description ? description : subTitle}</Subtitle>
      <MainContainer>
        <Side grow>
          <SideTitle>{"Method demo"}</SideTitle>
          <FuncEvalLive>{children}</FuncEvalLive>
        </Side>
      </MainContainer>
    </React.Fragment>
  );
};

const TitleLine = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: ${Spacing.lg};  
`;

const Links = styled("div")`
  display: flex;
  flex-direction: column;
`;

const LinkMethod = styled(Link)`
  svg {
    margin-right: ${Spacing.sm};
  }
  margin: ${Spacing.sm};
`;

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
