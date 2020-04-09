import React, { useEffect, useRef, useState } from "react";

import useWindowDimensions from "../utils/windowDimensionsHook";
import {Colors, Spacing, Typography} from "../rules";


import styled from "styled-components";
import * as d3 from "d3";
window.d3 = d3;
const functionPlot = require("function-plot");


const Graph = () => {
  const size = useWindowDimensions();
  const node = useRef(null);
  const [functionText, setFunctionText] = useState("x^2");
  const handleSubmit = event => {
    event.preventDefault();
    setFunctionText(event.target.functionText.value);
  };
  useEffect(() => {
    console.log(functionText);
    if (node.current) {
      functionPlot({
        target: node.current,
        width: size.width > 800 ? 700 : size.width - 80,
        xAxis: {
          label: "x - axis",
        },
        yAxis: {
          label: "y - axis",
        },
        height: 480,
        data: [
          {
            fn: functionText,
          },
        ],
      });
    }
  }, [node, functionText, size.width]);
  return (
    <React.Fragment>
      <GraphTitle>f(x) = {functionText}</GraphTitle>
      <GraphChart ref={node} />
      <Parameters>
        <form onSubmit={handleSubmit}>
          <input type="text" name="functionText" placeholder="x^2" />
          <button>Apply</button>
        </form>
      </Parameters>
    </React.Fragment>
  );
};


const GraphChart = styled("div")`
  margin: 0 0 ${Spacing.md} 0;
`;

const GraphTitle = styled("div")`
  font-size: ${Typography.subTitle.fontSize};
  text-align: center;
`;

const Parameters = styled("div")`
  display: flex;
  flex-direction: column;
  align-self: center;
  input {
    width: 360px;
    background: #fff;
    color: ${Colors.utility.black.default};
    font: inherit;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0 , .1);
    border: 0;
    outline: 0;
    padding: 22px 18px;
  }
  button {
      display: inline-block;
      color: inherit;
      font: inherit;
      border: 0;
      outline: 0;
      padding: 0;
      transition: all 200ms ease-in;
      cursor: pointer;
      background: ${Colors.primary.ocean.default};
      color: white;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
      border-radius: 2px;
      padding: 12px 36px;
      
      &:hover {
        background: ${Colors.primary.ocean.darker};
      }
      
      &:active {
        box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2);
      }
      margin-left: -85px;
    }
  }
`;



export default Graph;
