import React from "react";
import { Router } from "@reach/router";

import Home from "../components/Home.jsx";
import About from "../components/About.jsx";
import Oversight from "../components/Oversight";
import Help from "../components/Help";
import Graph from "../components/Graph";

import MethodsRouter from "./MethodsRouter";
import Page404 from "../components/Page404";

const BigRouter = () => {
  return (
    <Router>
      <Home path="/" />
      <Help path="help"/>
      <About path="about" />
      <Oversight path="oversight" />
      <MethodsRouter path="methods/*" />
      <Graph path="graph" />
      <Page404 default />
    </Router>
  );
};

export default BigRouter;
