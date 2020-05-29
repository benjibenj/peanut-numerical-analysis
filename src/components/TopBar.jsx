import React from "react";
import styled from "styled-components";
import { Colors, Shadows, Spacing } from "../rules";
import { Link } from "@reach/router";
import logo from "../img/logo0.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkIcon } from "../containers/BigContainer";

const TopBar = () => {
  return (
    <TopBarContainer>
      <Logo>
        <Link to="/">
          <img src={logo} alt={"logo_peanut"} />
        </Link>
      </Logo>
      <ul>
        <li>
          <LinkIcon to="/methods">Methods</LinkIcon>
        </li>
        <li>
          <LinkIcon to="/about">About</LinkIcon>
        </li>
        <li>
          <LinkIcon to="/help">
            Help
            <FontAwesomeIcon icon={"question-circle"} />
          </LinkIcon>
        </li>
      </ul>
    </TopBarContainer>
  );
};

const TopBarContainer = styled("nav")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 10px;
    float: right;
    font-weight: 700;
  }
  ul > li {
    display: inline-block;
  }
  li a {
    display: block;
    color: white;
    text-align: center;
    padding: ${Spacing.md};
    text-decoration: none;
  }
  @media (max-width: 420px) {
    li a {
      font-size: 13px;
    }
  }
  @media (max-width: 384px) {
    li a {
      padding: 18px 8px;
      font-size: 11px;
    }
  }
  width: 100%;
  background-color: ${Colors.primary.tan.default};
  border-bottom: 2px solid ${Colors.utility.black.default};
  box-shadow: ${Shadows.level3};
`;

const Logo = styled("div")`
  img {
    width: 70px;
  }
  padding: ${Spacing.md} 26px 12px;
`;

export default TopBar;
