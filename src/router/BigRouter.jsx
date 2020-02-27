import React from "react"
import {Router} from "@reach/router"

import Home from "../components/Home.jsx";
import Dashboard from "../components/Dashboard.jsx";
import About from "../components/About.jsx";


const BigRouter = () => {
  return (
    <Router>
      <Home path="/" />
      <Dashboard path="help" />
      <About path="about" />
      <Dashboard path="modules" />
    </Router>
  )
};

export default BigRouter;