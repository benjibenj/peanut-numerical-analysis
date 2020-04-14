import React from "react";
import { Router } from "@reach/router";

import MethodsDashboard from "../components/MethodsDashboard";
import FuncEval from "../components/methods/FuncEval.jsx";
import IncSearch from "../components/methods/IncSearch.jsx";
import Bisection from "../components/methods/Bisection";
import FalsePosition from "../components/methods/FalsePosition";
import FixedPoint from "../components/methods/FixedPoint";
import SolutionWithNewton from "../components/methods/SolutionWithNewton";
import SolutionWithSecante from "../components/methods/SolutionWithSecante";
import MultipleRoots from "../components/methods/MultipleRoots";
import SolutionOthers from "../components/methods/SolutionOthers";

import Page404 from "../components/Page404";

const MethodsRouter = ({location}) => {
  console.log(location);
  return (
    <Router>
      <MethodsDashboard path="/" />
      <FuncEval path="function-evaluator" />
      <IncSearch path="incremental-search" />
      <Bisection path="get-solution-bisection" />
      <FalsePosition path="get-solution-false-position" />
      <FixedPoint path="get-solution-fixed-point" />
      <SolutionWithNewton path="get-solution-newton" />
      <SolutionWithSecante path="get-solution-secante" />
      <MultipleRoots path="get-solution-multiple-roots" />
      <SolutionOthers path="get-solution-others" />
      <Page404 default />
    </Router>
  );
};

export default MethodsRouter;
