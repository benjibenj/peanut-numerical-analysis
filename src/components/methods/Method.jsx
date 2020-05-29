import React from "react";

import { BorderRadius, Colors, Shadows, Spacing } from "../../rules";
import { LinkIcon, Subtitle, Title } from "../../containers/BigContainer";

import { Link } from "@reach/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Method = ({
  title = "Title to be defined",
  prev,
  next,
  description,
  jsAlgorithm,
  pseudoCode,
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
              <FontAwesomeIcon icon={"arrow-alt-circle-left"} />
              {prev.name}
            </LinkMethod>
          )}
          {next && (
            <LinkMethod to={"/methods/" + next.id}>
              <FontAwesomeIcon icon={"arrow-alt-circle-right"} />
              {next.name}
            </LinkMethod>
          )}
        </Links>
      </TitleLine>
      {description && <Subtitle> description </Subtitle>}
      <MainContainer>
        <Side grow>
          <SideTitle>{"Method playground"}</SideTitle>
          <FuncEvalLive>{children}</FuncEvalLive>
        </Side>
      </MainContainer>
      {(jsAlgorithm || pseudoCode) && (
        <AlgoInfo>
          <h2>{title + " "}algorithm</h2>
          {jsAlgorithm && (
            <ExternalStyledLink target="_blank" href={jsAlgorithm}>
              <FontAwesomeIcon icon={"code"} />
              Code (javascript)
            </ExternalStyledLink>
          )}
          {pseudoCode && (
            <ExternalStyledLink target="_blank" href={pseudoCode}>
              <FontAwesomeIcon icon={"align-left"} />
              Pseudo-code
            </ExternalStyledLink>
          )}
        </AlgoInfo>
      )}
    </React.Fragment>
  );
};

const TitleLine = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-right: ${Spacing.lg};
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Links = styled("div")`
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    flex-direction: row;
    margin: 0 ${Spacing.xxl};
  }
  @media (max-width: 440px) {
    margin: 0 ${Spacing.xl};
  }
  @media (max-width: 340px) {
    margin: 0 ${Spacing.lg};
  }
`;

const LinkMethod = styled(Link)`
  svg {
    margin-right: ${Spacing.sm};
  }
  padding: ${Spacing.sm} ${Spacing.md};
  margin: ${Spacing.sm};
  @media (max-width: 500px) {
    margin: 0 ${Spacing.sm} 0 0;
  }
  border-radius: ${BorderRadius.lg};
  background-color: ${Colors.primary.tan.default};
  color: ${Colors.utility.white.default} !important;
  text-decoration: none;
  box-shadow: ${Shadows.level3};
  &:hover {
    transform: translateY(-1px);
    background-color: ${Colors.primary.tan.darker};
  }
`;

const ExternalStyledLink = styled("a")`
  svg {
    margin-right: ${Spacing.sm};
  }
  padding: ${Spacing.sm} ${Spacing.md};
  margin: ${Spacing.sm};
  @media (max-width: 500px) {
    margin: 0 ${Spacing.sm} 0 0;
  }
  border-radius: ${BorderRadius.lg};
  background-color: ${Colors.primary.tan.default};
  color: ${Colors.utility.white.default} !important;
  text-decoration: none;
  box-shadow: ${Shadows.level3};
  &:hover {
    transform: translateY(-1px);
    background-color: ${Colors.primary.tan.darker};
  }
`;

const MainContainer = styled("div")`
  display: flex;
  margin: ${Spacing.md} ${Spacing.xxl} ${Spacing.xl};
  @media (max-width: 440px) {
    margin: ${Spacing.md} ${Spacing.xl} ${Spacing.xl};
    font-size: 13px;
  }
  @media (max-width: 340px) {
    margin: ${Spacing.md} ${Spacing.lg} ${Spacing.xl};
  }
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

const AlgoInfo = styled("div")`
  margin: ${Spacing.md} ${Spacing.xxl} ${Spacing.xl};
  @media (max-width: 440px) {
    margin: ${Spacing.md} ${Spacing.xl} ${Spacing.xl};
    font-size: 13px;
  }
  @media (max-width: 340px) {
    margin: ${Spacing.md} ${Spacing.lg} ${Spacing.xl};
  }
`;

export default Method;
