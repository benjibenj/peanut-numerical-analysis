import React from "react";
import styled from "styled-components";
import {Spacing} from "../rules";

const CommentContainer = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

const Container = styled("div")`
  margin: ${Spacing.xl} ${Spacing.xxl};
`;

export default CommentContainer;
