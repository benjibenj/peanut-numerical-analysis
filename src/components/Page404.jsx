import React from "react";

import { Subtitle, Title } from "../containers/BigContainer";
import {Spacing} from "../rules";
import styled from "styled-components";

import lostSquirrel from "../img/lost_squirrel.jpg";

const Page404 = () => {
  return (
    <React.Fragment>
      <Title>Page 404</Title>
      <Subtitle>This url doesn't exist (yet)</Subtitle>
      <Image src={lostSquirrel} />
    </React.Fragment>
  );
};

const Image = styled("img")`
  margin: ${Spacing.md} ${Spacing.xxl} ${Spacing.xl};
  width: 80%;
`;

export default Page404;
