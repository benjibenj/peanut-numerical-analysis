import React from "react";
import styled from "styled-components";
import {Colors, Spacing, BorderRadius} from "../rules";
import { Link } from "@reach/router";

const ModulesDropDown = ({onClickOnLink}) => {
  return (
    <Container onClick={() => onClickOnLink()}>
      <Item>
        <Link to={"/methods"}>All methods</Link>
      </Item>
      <Item>
        <Link to={"/methods/function-evaluator"}>Function evaluator</Link>
      </Item>
    </Container>
  )
};

const Container = styled("div")`
  border: 2px solid ${Colors.primary.ocean.default};
  border-radius: ${BorderRadius.md};
  position: absolute;
  top: 70px;
  left: -10px;
  color: ${Colors.primary.tan.default};
  background: ${Colors.primary.ocean.lighter};
  max-width: 500px;
  min-width: 320px;
  padding: 0 ${Spacing.md};
  display: flex;
  flex-direction: column;
`;

const Item = styled("div")`
  a {
    text-decoration: none;
    color: ${Colors.utility.paragraph.default};
  }
  &:hover {
    a {
       color: ${Colors.utility.headline.default};
    }
  }
  margin: ${Spacing.xs} 0;
`;

export default ModulesDropDown;