import React from "react";
import styled from "styled-components";
import BigContainer from "../containers/BigContainer";
import CommentContainer from "../containers/CommentContainer";
import { Typography, Spacing } from "../rules";
import Disqus from "disqus-react";

const About = () => {
  const disqusShortname = "peanut-1"; // found in your Disqus.com dashboard
  const disqusConfig = {
    url: "http://localhost:3000", //this.props.pageUrl
    identifier: "about-page", //this.props.uniqueId
    title: "About", //this.props.title
  };

  return (
    <React.Fragment>
      <Title>About</Title>
      <BigContainer>
        <p>
          This website displays various numerical analysis methods. Those are single
          variable solving methods, equations systems methods and interpolation
          methods.
        </p>
        <p>Libraries/packages used for this project :</p>
        <ul>
          <li>
            <a href={"https://mauriciopoppe.github.io/function-plot/"}>
              function-plot
            </a>{" "}
            : A 2d function plotter powered by D3, by{" "}
            <a href={"https://www.mauriciopoppe.com/"}>Mauricio Poppe</a>
          </li>
          <li>
            <a href={"https://mathjs.org/"}>mathsjs</a> : an extensive math
            library for JavaScript and Node.js
          </li>
          <li>
            <a href={"https://www.npmjs.com/package/react-katex"}>
              react-katex
            </a>{" "}
            : display math expressions with{" "}
            <a href={"https://katex.org/"}>KaTeX</a> and React
          </li>
          <li>
            <a href={"https://fontawesome.com/"}>FontAwesome</a> : SVG, font,
            and CSS toolkit
          </li>
        </ul>
        <p>
          If you wish to contribute to this project, or to install it locally,
          check out the{" "}
          <a href="https://github.com/benjamin-vaysse/peanut-numerical-analysis">
            GitHub page.
          </a>
        </p>
        <p>
          <strong>
            This project is released under{" "}
            <a href="https://opensource.org/licenses/MIT">MIT License</a>.
          </strong>
        </p>
        <p>
          Built with <a href={"https://reactjs.org/"}>React</a>
        </p>
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
