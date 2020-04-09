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

export default BigContainer;
