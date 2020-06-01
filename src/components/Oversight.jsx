import React from "react";
import styled from "styled-components";
import BigContainer from "../containers/BigContainer";
import CommentContainer from "../containers/CommentContainer";
import Disqus from "disqus-react";
import { Title } from "../containers/BigContainer";
import { Spacing } from "../rules";
import classDiagram from "../img/ClassDiagram.png";
import sequenceDiagram from "../img/SequenceDiagram.png";

const Oversight = () => {
  const disqusShortname = "peanut-1"; // found in your Disqus.com dashboard
  const disqusConfig = {
    identifier: "oversight-page", //this.props.uniqueId
    title: "Oversight", //this.props.title
  };
  return (
    <React.Fragment>
      <Title>Project Oversight</Title>
      <BigContainer>
        <OverSightContainer>
          <h2>Useful links</h2>
          <Links>
            <li>
              <a
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                User guide (video)
              </a>
            </li>
            <li>
              <a
                href={
                  "https://github.com/benjamin-vaysse/peanut-numerical-analysis/blob/master/README.md"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Installation guide
              </a>
            </li>
            <li>
              <a
                href={
                  "https://github.com/benjamin-vaysse/peanut-numerical-analysis/tree/master/src/components/methods"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Methods codes and pseudocodes
              </a>
            </li>
          </Links>
          <Image>
            <img src={classDiagram} />
            <p>Class diagram</p>
          </Image>
          <Image>
            <img src={sequenceDiagram} />
            <p>Sequence diagram</p>
          </Image>
          <Image>
            {/*<img src={""} />*/}
            <h3>Diagram to be added </h3>
            <p>Use case diagram</p>
          </Image>
          <h2>Project Conclusion</h2>
          <p>The programming language chosen for this language is <strong>Javascript</strong>. We are using </p>
          <p>What were the limitations with the programming language chosen (javascript) ?</p>
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

const Image = styled("div")`
  display: flex;
  flex-direction: column;
  p {
    text-align: center;
  }
  img {
    width: 100%;
    margin-top: ${Spacing.md};
    margin-bottom: -${Spacing.sm};
  }
`;

const OverSightContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: left;
  max-width: 42rem;
  margin: 0 auto;
`;

const Links = styled("ul")`
  margin: -${Spacing.sm} 0 ${Spacing.lg} 0;
`;

export default Oversight;
