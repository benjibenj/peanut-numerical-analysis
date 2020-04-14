import React, { useState } from "react";

import { BorderRadius, Colors, Spacing } from "../../rules";
import { Subtitle, Title } from "../../containers/BigContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";

const Method = ({
  title = "Title to be defined",
  subTitle = "Description to be defined",
  pseudoCode = "There is no pseudocode for this function",
  children,
}) => {
  const [pseudoCodeVisible, setPseudoCodeVisible] = useState(false);
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Subtitle>{subTitle}</Subtitle>
      <MainContainer>
        <Side>
          <SideTitle>Options</SideTitle>
          <ToggleButton
            active={!pseudoCodeVisible}
            onClick={() => setPseudoCodeVisible(false)}
          >
            <FontAwesomeIcon icon={"wave-square"} />
            Functional example of the method
          </ToggleButton>
          <ToggleButton
            active={pseudoCodeVisible}
            onClick={() => setPseudoCodeVisible(true)}
          >
            <FontAwesomeIcon icon={"code"} />
            See the pseudocode
          </ToggleButton>
        </Side>
        <Side grow>
          <SideTitle>
            {pseudoCodeVisible ? "Pseudocode" : "Method demo"}
          </SideTitle>
          {pseudoCodeVisible ? (
            <PseudoCode>{pseudoCode}</PseudoCode>
          ) : (
            <FuncEvalLive>{children}</FuncEvalLive>
          )}
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

const ToggleButton = styled("button")`
  display: block;
  text-align: left;
  border: none;
  font: inherit;
  background-color: inherit;
  color: ${props =>
    props.active
      ? Colors.primary.ocean.lighter
      : Colors.utility.headline.default};
  padding: ${Spacing.sm} 0;
  svg {
    padding-right: ${Spacing.md};
  }
`;

const Side = styled("div")`
  margin-right: ${Spacing.xl};
  flex-grow: ${props => props.grow && "1"};
`;

const PseudoCode = styled("code")`
  background: ${Colors.utility.black.default};
  color: ${Colors.utility.white.default};
  border-radius: ${BorderRadius.md};
  padding: 15px 20px 12px 22px;
  display: block;
  overflow-x: scroll;
  width: 100%;
  font-size: 16px;
  line-height: 1.75;
`;

const FuncEvalLive = styled("div")`
  background-color: white;
  border-radius: ${BorderRadius.md};
  flex-grow: 1;
  width: 100%;
  padding: ${Spacing.md} ${Spacing.lg};
`;

export default Method;
