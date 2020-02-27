import React from "react"
import {Link, Router} from "@reach/router"

import Home from "../components/Home.jsx";
import Dashboard from "../components/Dashboard.jsx";

const BigRouter = () => {
  return (
    <Router>
      <Home path="/"/>
      <Dashboard path="help"/>
      <Home path="/about"/>
      <Home path="/modules"/>
    </Router>
  )
};

export default BigRouter;