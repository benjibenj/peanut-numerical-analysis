import React from "react";

import {Spacing} from "../../rules";
import {Title, Subtitle} from "../../containers/BigContainer";

import styled from "styled-components";

const IncSearch = () => {
  return (
    <React.Fragment>
      <Title>Incremental Search</Title>
      <Subtitle>
        Subtitle to define
      </Subtitle>
      <MainContainer>
      </MainContainer>
    </React.Fragment>
  );
};

const MainContainer = styled("div")`
  margin: ${Spacing.xxl} ${Spacing.xl};
  display: flex;
  flex-direction: row;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
  align-items: left;
`;


export default IncSearch;
