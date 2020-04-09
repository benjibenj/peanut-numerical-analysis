import React from "react";
import { Router } from "@reach/router";

import Home from "../components/Home.jsx";
import About from "../components/About.jsx";
import Oversight from "../components/Oversight";
import FuncEval from "../components/modules/FuncEval.jsx";
import IncSearch from "../components/modules/IncSearch.jsx"
import Dashboard from "../components/Dashboard";

const BigRouter = () => {
  return (
    <Router>
      <Home path="/" />
      <About path="about" />
      <Oversight path="oversight" />
      <Empty path="modules">
        <Dashboard path="/" />
        <FuncEval path="function-evaluator" />
        <IncSearch path="incremental-search" />
      </Empty>
    </Router>
  );
};

const Empty = ({ children }) => {
  return children;
}
export default BigRouter;
