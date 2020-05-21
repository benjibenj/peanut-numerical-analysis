import React from "react";
import styled from "styled-components";
import { BorderRadius, Colors, Shadows, Spacing, Typography } from "../rules";
import { Link } from "@reach/router";

const BigContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled("div")`
  margin: ${Spacing.lg} ${Spacing.xxl};
  padding: ${Spacing.lg} ${Spacing.xl};
  border-radius: ${BorderRadius.lg};
  border: 2px solid ${Colors.utility.headline.default};
`;

export const Title = styled("div")`
  font-size: ${Typography.largeTitle.fontSize};
  margin: ${Spacing.xl} ${Spacing.xxl} ${Spacing.xl};
`;

export const Subtitle = styled("div")`
  max-width: 700px;
  font-size: ${Typography.subTitle.fontSize};
  margin: ${Spacing.lg} ${Spacing.xxl} ${Spacing.xl};
  svg {
    margin-right: ${Spacing.sm};
  }
`;

export const RowContainer = styled("div")`
  display: flex;
  flex-direction: row;
`;

export const MediaContainer = styled("div")`
  margin-top: ${Spacing.md};
  display: flex;
  flex-direction: row;
  @media (max-width: ${props => (props.width ? props.width : "800px")}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const Eval = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  ul {
    display: inline-block;
    margin: auto;
  }
`;

export const Parameters = styled("div")`
  padding-bottom: ${Spacing.md};
  p {
    text-align: center;
  }
  form {
    margin-left: ${Spacing.md};
    display: grid;
    grid-template-columns: 300px;
    grid-template-rows: 75px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    @media (max-width: ${props => (props.width ? props.width : "800px")}) {
      grid-template-columns: 300px 300px;
    }
    @media (max-width: 800px) {
      grid-template-columns: 300px;
    }
    justify-items: left;
    align-items: flex-start;
  }
  label {
    display: block;
    font-weight: bold;
  }
  input {
    display: block;
    margin: ${Spacing.sm} 0;
    border: none;
    font-size: inherit;
    padding: 12px 20px;
    box-sizing: border-box;
  }
  border-radius: ${BorderRadius.sm};
  border: 1px solid ${Colors.primary.ocean.lighter};
  box-shadow: ${Shadows.level3};
`;

export const Error = styled("div")`
  border-radius: ${BorderRadius.md};
  background-color: ${Colors.primary.tan.default};
  color: white;
  padding: ${Spacing.md} ${Spacing.lg};
  font-weight: bold;
  margin: ${Spacing.md} 0;
`;

export const TableStyle = styled("div")`
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: ${Spacing.xs};
    margin-left:auto; 
    margin-right:auto;
  }
`;

export const Button = styled("button")`
  font-size: inherit;
  border: 2px solid ${Colors.primary.ocean.default};
  color: ${Colors.primary.ocean.darker};
  border-radius: ${BorderRadius.sm};
  font-weight: bold;
`;

export const LinkIcon = styled(Link)`
  svg {
    padding-left: ${Spacing.xs};
  }
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const LinkGraph = styled("div")`
  display: flex;
  justify-content: center;
  a {
    color: ${Colors.utility.white.default} !important;
    text-decoration: none;
    font-weight: bold;
    margin: ${Spacing.xs} 0;
    padding: ${Spacing.xs} ${Spacing.md};
    border-radius: ${BorderRadius.md};
    background-color: ${Colors.primary.tan.default};
    text-align: center;
  }
`;

export const MatrixParameters = styled("div")`
  label {
    display: block;
    font-weight: bold;
    margin: ${Spacing.sm} 0 ${Spacing.md} 0;
  }
  input {
    display: block;
    margin: ${Spacing.sm} 0;
    border: none;
    font-size: inherit;
    box-sizing: border-box;
    padding: 13px 0;
    text-align: center;
    margin: 5px;
    height: 12px;
    width: 50px;
  }
  form {
    text-align: center;
  }
  margin-bottom: ${Spacing.xs};
`;

export default BigContainer;
