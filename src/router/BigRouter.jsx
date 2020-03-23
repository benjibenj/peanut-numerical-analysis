import React from "react"
import {Router} from "@reach/router"

import Home from "../components/Home.jsx";
import Dashboard from "../components/Dashboard.jsx";
import About from "../components/About.jsx";
import Oversight from "../components/Oversight";


const BigRouter = () => {
  return (
    <Router>
      <Home path="/" />
      <Dashboard path="help" />
      <About path="about" />
      <Dashboard path="modules" />
      <Oversight path="oversight" />
    </Router>
  )
};

export default BigRouter;