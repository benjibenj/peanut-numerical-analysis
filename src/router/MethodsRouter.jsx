import React from "react";
import { Router } from "@reach/router";

import MethodsDashboard from "../components/MethodsDashboard";
import FuncEval from "../components/methods/2funcEval/FuncEval.jsx";
import IncSearch from "../components/methods/3incSearch/IncSearch.jsx";
import Bisection from "../components/methods/4bisection/Bisection";
import FalsePosition from "../components/methods/5falsePosition/FalsePosition";
import FixedPoint from "../components/methods/6fixedPoint/FixedPoint.jsx";
import SolutionWithNewton from "../components/methods/7newton/SolutionWithNewton";
import SolutionWithSecante from "../components/methods/8secante/SolutionWithSecante";
import MultipleRoots from "../components/methods/9multipleroots/MultipleRoots";
import GaussSimple from "../components/methods/10gaussSimple/GaussSimple";

import Page404 from "../components/Page404";

const MethodsRouter = () => {
  return (
    <Router>
      <MethodsDashboard path="/" />
      <FuncEval path="function-evaluator" name={"Function evaluator"} />
      <IncSearch path="incremental-search" name={"Incremental search"}/>
      <Bisection path="bisection" name={"Bisection"}/>
      <FalsePosition path="false-position" name={"False position"} />
      <FixedPoint path="fixed-point" name={"Fixed point"} />
      <SolutionWithNewton path="newton-raphson" name={"Newton-Raphson method"} />
      <SolutionWithSecante path="secante" name={"Secante method"} />
      <MultipleRoots path="multiple-roots" name={"Multiple roots"} />
      <GaussSimple path={"gauss-simple"} name={"Gaussian elimination (simple)"} />
      <Page404 default />
    </Router>
  );
};

export default MethodsRouter;
