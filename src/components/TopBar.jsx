import React from "react";
import styled from "styled-components";
import {Colors, Shadows, Spacing} from "../rules";
import { Link } from "@reach/router";
import logo from "../img/logo0.png";

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
          <Link to="/modules">Modules</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/oversight">Oversight</Link>
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
