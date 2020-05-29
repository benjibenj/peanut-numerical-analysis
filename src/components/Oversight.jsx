import React from "react";
import styled from "styled-components";
import BigContainer from "../containers/BigContainer";
import CommentContainer from "../containers/CommentContainer";
import Disqus from "disqus-react";
import { Title } from "../containers/BigContainer";
import { Spacing } from "../rules";

const Oversight = () => {
  const disqusShortname = "peanut-1"; // found in your Disqus.com dashboard
  const disqusConfig = {
    identifier: "oversight-page", //this.props.uniqueId
    title: "Oversight" //this.props.title
  };

  return (
    <React.Fragment>
      <Title>Project Oversight</Title>
      <BigContainer>
        <OverSightContainer>
          <a
            href={
              "https://drive.google.com/drive/folders/1rLZAqN2O43AShqTViEpLd-FTJTcw_swr?usp=sharing"
            }
          >
            Check out some of the files associated with this project
            (pseudocodes, assignements, ... etc)
          </a>
          <a
            href={
              "https://github.com/benjamin-vaysse/peanut-numerical-analysis"
            }
          >
            Check out Github project
          </a>
        </OverSightContainer>
      </BigContainer>
      <CommentContainer>
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </CommentContainer>
    </React.Fragment>
  );
};

const OverSightContainer = styled("div")`
  display: flex;
  flex-direction: column;
  a {
    margin: ${Spacing.md} 0;
  }
`;

export default Oversight;
