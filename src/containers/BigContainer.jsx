import React from "react";
import styled from "styled-components";
import {BorderRadius, Colors, Spacing, Typography} from "../rules";

const BigContainer = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

const Container = styled("div")`
  margin: ${Spacing.lg} ${Spacing.xxl};
  padding: ${Spacing.lg} ${Spacing.xl} ;
  border-radius: ${BorderRadius.lg};
  border: 2px solid ${Colors.utility.headline.default};
`;

export const Title = styled("div")`
  font-size: ${Typography.largeTitle.fontSize};
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
`;

export const Subtitle = styled("div")`
  max-width: 700px;
  font-size: ${Typography.subTitle.fontSize};
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
  svg {
    margin-right: ${Spacing.sm};
  }
`;

export const RowContainer = styled("div")`
  display: flex;
  flex-direction: row;
`;

export const Eval = styled("div")`
  margin: ${Spacing.sm} 0 ${Spacing.lg} ${Spacing.sm};
`;

export const Params = styled("div")`
  li{
    margin: ${Spacing.md} 0;
  }
`;

export const Parameters = styled("div")`
  label {
    display: block;
    font-weight: bold;
    margin: ${Spacing.sm} 0 ${Spacing.md} 0;
  }
  input {
    display: block;
    margin: ${Spacing.sm} 0;
    border: none;
    font-size: inherit;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }
  button {
    font-size: inherit;
    border: 2px solid ${Colors.primary.ocean.default};
    color: ${Colors.primary.ocean.darker};
    border-radius: ${BorderRadius.sm};
    font-weight: bold;
  }
`;

export default BigContainer;
