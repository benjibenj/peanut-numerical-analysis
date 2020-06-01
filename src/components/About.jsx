import React from "react";
import styled from "styled-components";
import BigContainer from "../containers/BigContainer";
import CommentContainer from "../containers/CommentContainer";
import { Typography, Spacing } from "../rules";
import Disqus from "disqus-react";
import { Link } from "@reach/router";

const About = () => {
  const disqusShortname = "peanut-1"; // found in your Disqus.com dashboard
  const disqusConfig = {
    identifier: "about-page", //this.props.uniqueId
    title: "About" //this.props.title
  };

  return (
    <React.Fragment>
      <Title>About</Title>
      <BigContainer>
        <p>
          This website displays various numerical analysis methods. Those are{" "}
          <strong>single variable</strong>,{" "}
          <strong>systems of equations</strong>, and{" "}
          <strong>interpolation</strong> solving methods.
        </p>
        <p>Libraries/packages used for this project :</p>
        <ul>
          <li>
            <a href={"https://mauriciopoppe.github.io/function-plot/"} target="_blank" rel="noopener noreferrer">
              function-plot
            </a>{" "}
            : A 2d function plotter powered by D3, by{" "}
            <a href={"https://www.mauriciopoppe.com/"} target="_blank" rel="noopener noreferrer">Mauricio Poppe</a>
          </li>
          <li>
            <a href={"https://mathjs.org/"} target="_blank" rel="noopener noreferrer">mathsjs</a> : an extensive math
            library for JavaScript and Node.js
          </li>
          <li>
            <a href={"https://www.npmjs.com/package/react-katex"} target="_blank" rel="noopener noreferrer">
              react-katex
            </a>{" "}
            : display math expressions with{" "}
            <a href={"https://katex.org/"} target="_blank" rel="noopener noreferrer">KaTeX</a> and React
          </li>
          <li>
            <a href={"https://fontawesome.com/"} target="_blank" rel="noopener noreferrer">FontAwesome</a> : SVG, font,
            and CSS toolkit
          </li>
        </ul>
        <p>
          Big thanks to <em>open-source</em> for existing!
        </p>
        <p>
          If you wish to contribute to this project, or to install it locally,
          check out the{" "}
          <a href="https://github.com/benjamin-vaysse/peanut-numerical-analysis" target="_blank" rel="noopener noreferrer">
            GitHub page.
          </a>
        </p>
        <p>
          Built with <a href={"https://reactjs.org/"} target="_blank" rel="noopener noreferrer">React</a>
        </p>
        <p>
          Have a look at the
          <Link to="/oversight"> project oversight </Link>(academic stuff).
        </p>
        <p>
          <strong>
            This project is released under{" "}
            <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>.
          </strong>
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
