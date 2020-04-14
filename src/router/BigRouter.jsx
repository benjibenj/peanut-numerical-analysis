import React from "react";
import { Router } from "@reach/router";

import Home from "../components/Home.jsx";
import About from "../components/About.jsx";
import Oversight from "../components/Oversight";

import MethodsRouter from "./MethodsRouter";
import Page404 from "../components/Page404";

const BigRouter = () => {
  return (
    <Router>
      <Home path="/" />
      <About path="about" />
      <Oversight path="oversight" />
      <MethodsRouter path="methods/*" />
      <Page404 default />
    </Router>
  );
};

export default BigRouter;
