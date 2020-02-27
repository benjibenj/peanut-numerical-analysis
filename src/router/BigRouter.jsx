import React from "react"
import { Router } from "@reach/router"

import Home from "../components/Home.jsx";
import Dash from "../components/Dash.jsx";

const PublicRouter = () => {
  render()
  {
    return (
      <Router>
        <Home path="/"/>
        <Dash path="dashboard"/>
      </Router>
    );
  }
};

export default PublicRouter;