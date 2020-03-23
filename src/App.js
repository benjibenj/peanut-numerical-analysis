import React from "react";
import BigRouter from "./router/BigRouter";
import TopBar from "./components/TopBar.jsx";

const App = () => {
  return (
    <React.Fragment>
      <TopBar />
      <BigRouter />
    </React.Fragment>
  );
};

export default App;