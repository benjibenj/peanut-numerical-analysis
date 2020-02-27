import React from "react"
import { Router } from "@reach/router"

import Home from "../components/Home.jsx";
import Dashboard from "../components/Dashboard.jsx";

const BigRouter = () => {
  return (
    <Router>
      <Home path="/"/>
      <Dashboard path="dashboard"/>
    </Router>
  )
};

export default BigRouter;