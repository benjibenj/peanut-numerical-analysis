import React from "react";

import { MediaContainer, Title } from "../containers/BigContainer";
import { Spacing } from "../rules";
import styled from "styled-components";

import page_not_found_illustation from "../img/page-not-found.png";

const Page404 = () => {
  return (
    <React.Fragment>
      <CenteredTitle>Page not found</CenteredTitle>
      <MediaContainer>
        <Image src={page_not_found_illustation} />
      </MediaContainer>
    </React.Fragment>
  );
};

const Image = styled("img")`
  margin: ${Spacing.md} auto;
  width: 50%;
`;

const CenteredTitle = styled(Title)`
  text-align: center;
  margin: ${Spacing.lg} 0;
`;

export default Page404;
