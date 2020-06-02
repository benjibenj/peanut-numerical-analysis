import React from "react";
import styled from "styled-components";
import BigContainer from "../containers/BigContainer";
import CommentContainer from "../containers/CommentContainer";
import Disqus from "disqus-react";
import { Title } from "../containers/BigContainer";
import { Spacing } from "../rules";
import classDiagram from "../img/ClassDiagram.png";
import sequenceDiagram from "../img/SequenceDiagram.png";
import { Link } from "@reach/router";
//import useCaseDiagram from "../img/useCaseDiagram.png";

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
              <a href={"https://youtu.be/gv9PMYhiMfU"} target="_blank" rel="noopener noreferrer">
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
            <img src={classDiagram} alt={"class-diagram"} />
            <p>Class diagram</p>
          </Image>
          <Image>
            <img src={sequenceDiagram} alt={"class-diagram"} />
            <p>Sequence diagram</p>
          </Image>
          <Image>
            {/*<img src={useCaseDiagram} alt="useCaseDiagram />*/}
            <p>Use case diagram</p>
          </Image>
          <h2>Project Conclusion</h2>
          <p>
            The programming language chosen for this language is{" "}
            <strong>Javascript</strong>. On top of that, we are using React.js,
            which is a library for building user interfaces. All the algorithms
            are written in pure JavaScript (ES6). We feel happy with the chosen
            stack. The navigation between the different pages is very fast and
            most of the methods are solved in a very reasonable time. However,
            we found some performance issues for solving problems involving
            large matrices (the algorithm ran much faster on compiled
            programming languages such as C in MatLab).
          </p>
          <p>
            The most used library in this project (except React) is{" "}
            <strong>mathjs</strong>. This library proved itself very useful, and
            it provided us adequate tools in the vast majority of the cases. The
            limitations of this library were found in the calculation of the
            p-norm of a vector (we developed the solution ourselves) and in the
            calculation of the eigtenvalues of a matrix (in some cases, the
            solution isn't exact and we encourage the user to use MatLab to
            double check the value of the spectral radius).
          </p>
          <p>
            You can find a list of all the tools/libraries used for this project
            in the <Link to={"/about"}>about page</Link>.
          </p>
          <p>
            Overall, the development of this project was very interesting. We
            all learned a lot, whether it is project management, coding
            knowledge and skills, mathematics, version-control or LaTeX.
          </p>
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
