import React from "react";
import styled from "styled-components";
import {BorderRadius, Colors, Spacing} from "../rules";

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

export default BigContainer;
