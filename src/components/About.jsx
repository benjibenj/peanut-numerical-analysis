import React from "react";
import styled from "styled-components";
import BigContainer from "../containers/BigContainer";
import CommentContainer from "../containers/CommentContainer";
import { Typography, Spacing } from "../rules";
import Disqus from "disqus-react"


const About = () => {
  const disqusShortname = "peanut-1"; // found in your Disqus.com dashboard
  const disqusConfig = {
    url: "http://localhost:3000", //this.props.pageUrl
    identifier: "about-page", //this.props.uniqueId
    title: "About" //this.props.title
  };

  return (
    <React.Fragment>
      <Title>About</Title>
      <BigContainer>
        <p>
          This awesome website was created in the semester of 2020-1 (January to June) by 2 mathematical engineers and 2 software
          engineers students from <a href={"http://www.eafit.edu.co/"}>EAFIT University</a> in Medellín,
          Colombia.
        </p>
        <p>
          This website serves a double purpose:
          <ol>
            <li>
              Firstly, it is a platform for the students to turn in assignments to the professor, and for the professor
              to give feedback to the students in the form of comments.
            </li>
            <li>
              Secondly, it displays various numerical analysis methods seen in the course "Numerical Analysis - ST0256".
              Those are single variable solving methods, equations systems methods, interpolation methods. Also, methods
              used to solve differentiation and differential equations.
            </li>
          </ol>
        </p>
        <p>If you wish to contribute to this project, or to install it locally, check out the <a href="https://github.com/benjamin-vaysse/peanut-numerical-analysis">GitHub page.</a></p>
        <p><strong>This project is released under <a href="https://opensource.org/licenses/MIT">MIT License</a>.</strong></p>
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

const Title = styled("div")`
  font-size: ${Typography.title.fontSize};
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
`;

export default About;
